import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get("/api/products/brands");
        setBrands(data);
      } catch (err) {
        console.error("Failed to fetch brands", err);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Brands</h1>

      {brands.length === 0 ? (
        <p className="text-center text-gray-500">No brands found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=${encodeURIComponent(brand)}`}
              className="border rounded-lg p-6 text-center shadow hover:shadow-md transition bg-white"
            >
              <span className="text-lg font-semibold text-gray-800">{brand}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands;
