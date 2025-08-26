import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/authSlice";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Header from "./pages/Header";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import MyAddresses from "./pages/MyAddresses";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./pages/ProductDetails";
import Membership from "./pages/Membership";
import StravaCallback from "./StravaCallback";
import CreateAccount from "./pages/createAccount";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<Products />} /> {/* ✅ Updated */}
        <Route path="/products" element={<Products />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/account/edit-profile" element={<EditProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account/change-password" element={<ChangePassword />} />
        <Route path="/account/addresses" element={<MyAddresses />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/orders" element={<PlaceOrder />} />
        <Route path="/account/orders/:id" element={<OrderDetails />} />
        <Route path="/account/membership" element={<Membership />} />
        <Route path="/strava/callback" element={<StravaCallback />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;


