import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWishlist } from "../context/WishlistContext";

const Products = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { category } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("q");
  const brandFromQuery = queryParams.getAll("brand");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [brandFilter, setBrandFilter] = useState(brandFromQuery || []);
  const [subcategoryFilter, setSubcategoryFilter] = useState([]);

  const [allBrands, setAllBrands] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);

  // 🟢 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const brandQuery = brandFilter.map((b) => `brand=${b}`).join("&");
        const subcatQuery = subcategoryFilter.map((s) => `subcategory=${s}`).join("&");

        let query = searchKeyword
          ? `/api/products/search?q=${searchKeyword}`
          : `/api/products?pageNumber=${page}`;

        if (!searchKeyword && category) query += `&category=${category}`;
        if (!searchKeyword && sort) query += `&sort=${sort}`;
        if (!searchKeyword && brandQuery) query += `&${brandQuery}`;
        if (!searchKeyword && subcatQuery) query += `&${subcatQuery}`;

        const { data } = await axios.get(query);

        setProducts(Array.isArray(data.products) ? data.products : []);
        setPage(data.page || 1);
        setPages(data.pages || 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category, page, sort, brandFilter, subcategoryFilter, searchKeyword]);

  // 🟢 Fetch Available Filters
  useEffect(() => {
    const fetchFilters = async () => {
      if (!category) {
        setAllBrands([]);
        setAllSubcategories([]);
        return;
      }

      try {
        const { data } = await axios.get(`/api/products/filters?category=${category}`);
        setAllBrands(data.brands || []);
        setAllSubcategories(data.subcategories || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
        setAllBrands([]);
        setAllSubcategories([]);
      }
    };

    fetchFilters();
  }, [category]);

  // 🔁 Sync URL with Filters
  useEffect(() => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (searchKeyword) params.set("q", searchKeyword);
    if (sort) params.set("sort", sort);

    brandFilter.forEach((b) => params.append("brand", b));
    subcategoryFilter.forEach((s) => params.append("subcategory", s));

    window.history.replaceState(null, "", `/products?${params.toString()}`);
  }, [brandFilter, subcategoryFilter, sort, category, searchKeyword]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product added to cart!", {
      position: "top-center",
      autoClose: 2000,
      theme: "light",
    });
  };

  const handleCheckboxChange = (e, setter, values) => {
    const { value, checked } = e.target;
    if (checked) {
      setter([...values, value]);
    } else {
      setter(values.filter((v) => v !== value));
    }
    setPage(1); // Reset page
  };

  const resetFilters = () => {
    setSort("");
    setBrandFilter([]);
    setSubcategoryFilter([]);
    setPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row px-4 py-6">
      <ToastContainer />

      {/* Sidebar Filters */}
      {!searchKeyword && (
        <aside className="md:w-1/4 mb-6 md:mb-0 md:pr-6 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-4">🔍 Filters</h2>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            <label className="block">
              <input
                type="radio"
                name="price"
                checked={sort === "priceAsc"}
                onChange={() => setSort("priceAsc")}
              />
              <span className="ml-2">Low to High</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="price"
                checked={sort === "priceDesc"}
                onChange={() => setSort("priceDesc")}
              />
              <span className="ml-2">High to Low</span>
            </label>
          </div>

          {/* Brand Filter */}
          {allBrands.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Brand</h3>
              {allBrands.map((brand) => (
                <label key={brand} className="block">
                  <input
                    type="checkbox"
                    value={brand}
                    checked={brandFilter.includes(brand)}
                    onChange={(e) => handleCheckboxChange(e, setBrandFilter, brandFilter)}
                  />
                  <span className="ml-2">{brand}</span>
                </label>
              ))}
            </div>
          )}

          {/* Subcategory Filter */}
          {allSubcategories.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Subcategory</h3>
              {allSubcategories.map((sub) => (
                <label key={sub} className="block">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={subcategoryFilter.includes(sub)}
                    onChange={(e) =>
                      handleCheckboxChange(e, setSubcategoryFilter, subcategoryFilter)
                    }
                  />
                  <span className="ml-2">{sub}</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={resetFilters}
            className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
          >
            Reset Filters
          </button>
        </aside>
      )}

      {/* Product Grid */}
      <div className="md:w-3/4">
        <h1 className="text-3xl font-bold mb-4">
          {searchKeyword
            ? `Search Results for "${searchKeyword}"`
            : brandFromQuery.length > 0
            ? `Showing ${products.length} result${
                products.length !== 1 ? "s" : ""
              } for Brand: ${brandFromQuery.join(", ")}`
            : category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
            : "All Products"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p>
              {searchKeyword
                ? `No results found for "${searchKeyword}".`
                : "No products found."}
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="border p-3 rounded shadow-sm relative group hover:shadow-md transition"
              >
                <div className="absolute top-2 left-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
                  NEW ARRIVALS
                </div>

                <div className="h-56 bg-gray-100 flex items-center justify-center mb-3">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">No Image</p>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 mb-1">
                  <div className="flex items-center text-sm text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded">
                    ★ {product.rating || 4.5} | {product.reviews || "3.6k"}
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`text-xl ${
                      isWishlisted(product._id) ? "text-red-500" : "text-gray-400"
                    } hover:text-red-500 transition`}
                  >
                    {isWishlisted(product._id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="px-1">
                  <p className="font-bold text-sm">{product.brand || "KIPSTA"}</p>
                  <p className="text-sm text-gray-600 truncate">{product.name}</p>
                  <p className="text-base font-semibold mt-1">₹ {product.price}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-3 bg-gray-100 text-black px-4 py-2 rounded hover:bg-blue-100"
                >
                  ADD TO CART
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!searchKeyword && pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2 border border-gray-300 rounded">
              Page {page} of {pages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
              disabled={page === pages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
