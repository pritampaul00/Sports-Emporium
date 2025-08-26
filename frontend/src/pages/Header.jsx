// components/Header.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, fetchCurrentUser, setShippingAddress } from "../redux/authSlice";
import { selectCartItems } from "../selectors/cartSelectors";
import { selectUserAddresses } from "../selectors/userSelectors";
import { FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const addresses = useSelector(selectUserAddresses);
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedAddress && user?.addresses?.length) {
      const defaultAddr = user.addresses.find((a) => a.default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
        dispatch(setShippingAddress(defaultAddr));
      }
    }
  }, [user, selectedAddress, dispatch]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      try {
        const res = await fetch(`/api/products/search?q=${value}`);
        const data = await res.json();
        setSuggestions(data.products || []);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">SE</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">Sports Emporium</span>
        </Link>

        {/* Search */}
        <div className="flex-1 mx-6 relative hidden md:block">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchEnter}
            placeholder="Search for sports, products..."
            className="w-full py-2 px-4 pl-10 rounded-full border bg-gray-100 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 bg-white shadow-md rounded-md w-full z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/products/search?q=${encodeURIComponent(item.name)}`)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-sm">
          {/* Account */}
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex flex-col items-center">
                <FaUserCircle className="text-xl" />
                <span>Account</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-52 bg-white border shadow-lg rounded-md z-50">
                <div className="px-4 py-2 font-semibold text-gray-700 border-b">{user.name}</div>
                {["/account", "/account/orders", "/wallet", "/account/addresses"].map((path, i) => (
                  <Menu.Item key={path}>
                    {({ active }) => (
                      <Link
                        to={path}
                        className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                      >
                        {path.split("/").pop().replace("account", "My Profile").replace("orders", "Orders & Returns").replace("wallet", "Wallet").replace("addresses", "My Addresses")}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link to="/login" className="flex flex-col items-center">
              <FaUserCircle className="text-xl" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative flex flex-col items-center">
            <div className="relative">
              <FaHeart className="text-xl hover:text-red-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-sm mt-1">Wishlist</span>
          </Link>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative flex flex-col items-center cursor-pointer"
          >
            <div className="relative">
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-sm mt-1">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
}
