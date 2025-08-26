import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer />

      <div className="border p-4 rounded shadow-sm hover:shadow-md transition relative group">
        {/* Badge */}
        <div className="absolute top-2 left-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
          FEATURED
        </div>

        {/* Product Image */}
        <div className="h-72 bg-gray-100 flex items-center justify-center mb-4">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
          ) : (
            <p className="text-gray-500">No Image</p>
          )}
        </div>

        {/* Rating + Wishlist */}
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="flex items-center text-sm text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded">
            ★ {product.rating || 4.5} | {product.reviews || "3.6k"}
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className={`text-xl ${isWishlisted(product._id) ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition`}
          >
            {isWishlisted(product._id) ? "♥" : "♡"}
          </button>
        </div>

        {/* Product Info */}
        <div className="px-1">
          <p className="font-bold text-sm">{product.brand || "KIPSTA"}</p>
          <p className="text-md text-gray-800">{product.name}</p>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <p className="text-lg font-semibold mt-2">₹ {product.price}</p>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-gray-100 text-black px-4 py-2 rounded hover:bg-blue-100"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
