import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to Cart!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-sm relative">
              <div className="h-56 bg-gray-100 flex items-center justify-center mb-3">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 text-red-500 text-xl"
              >
                ♥
              </button>
              <p className="font-bold text-sm">{product.brand || "Brand"}</p>
              <p className="text-sm text-gray-600">{product.name}</p>
              <p className="text-base font-semibold">₹ {product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full mt-3 bg-gray-100 text-black px-4 py-2 rounded hover:bg-blue-100"
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
