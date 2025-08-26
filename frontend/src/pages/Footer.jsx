import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Sports Emporium</h2>
          <p className="text-sm mb-4">
            Your one-stop destination for all things sports – from gear to apparel.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            <li><Link to="/brands" className="hover:text-white">Brands</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products/Cricket" className="hover:text-white">Cricket</Link></li>
            <li><Link to="/products/Football" className="hover:text-white">Football</Link></li>
            <li><Link to="/products/Badminton" className="hover:text-white">Badminton</Link></li>
            <li><Link to="/products/Running" className="hover:text-white">Running</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://mellow-marigold-13ffb8.netlify.app/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://mellow-marigold-13ffb8.netlify.app/data-deletion"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Data Deletion
              </a>
            </li>
            <li><Link to="/account" className="hover:text-white">My Account</Link></li>
            <li><Link to="/account/orders" className="hover:text-white">Orders & Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Sports Emporium. All rights reserved.
      </div>
    </footer>
  );
}
