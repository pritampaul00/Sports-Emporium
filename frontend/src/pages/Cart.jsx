import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAddresses } from "@/selectors/userSelectors";
import { useNavigate } from "react-router-dom";
import AddressSidebar from "@/components/ui/AddressSidebar";
import { FaTrash } from "react-icons/fa";
import { fetchCurrentUser, setShippingAddress } from "@/redux/authSlice";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const addresses = useSelector(selectUserAddresses);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

useEffect(() => {
  dispatch(fetchCurrentUser()).then(() => {
    console.log("User after fetch:", user);
  });
}, [dispatch]);


  useEffect(() => {
    if (!selectedAddress && user?.addresses?.length) {
      const defaultAddr = user.addresses.find((addr) => addr.default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
        dispatch(setShippingAddress(defaultAddr));
      }
    }
  }, [user, selectedAddress, dispatch]);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    navigate("/checkout");
  };

  const membership = user?.membership?.level || "Basic";
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = membership === "Basic" ? 199 : 0;
  const discount = membership === "Pro" ? totalPrice * 0.05 : 0;
  const finalTotal = totalPrice - discount + shippingFee;

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Home Delivery */}
        <div className="border p-4 rounded shadow">
          <h2 className="font-bold mb-4">Home Delivery</h2>
          {selectedAddress ? (
            <>
              <p className="text-sm text-gray-700">{selectedAddress.label}</p>
              <p className="text-sm text-gray-600">
                {selectedAddress.line1}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip}
              </p>
            </>
          ) : (
            <p className="text-sm text-red-500">No address selected</p>
          )}
          <button
            onClick={() => setShowSidebar(true)}
            className="mt-4 px-4 py-2 bg-blue-700 text-white rounded text-sm"
          >
            Change Delivery Address
          </button>
          <AddressSidebar
            isOpen={showSidebar}
            onClose={() => setShowSidebar(false)}
            onSelect={(address) => {
              setSelectedAddress(address);
              dispatch(setShippingAddress(address));
              setShowSidebar(false);
            }}
          />
        </div>

        {/* Cart Items */}
        <div className="border p-4 rounded shadow">
          <h2 className="font-bold mb-4">Items in Cart</h2>
          {cart.length === 0 ? (
            <p>No items in your cart.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <input type="checkbox" defaultChecked />
                  <img src={item.images?.[0]} alt={item.name} className="w-20 h-20 object-cover" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                    <div className="mt-1">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                        className="border px-2 py-1 rounded text-sm"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                          <option key={qty} value={qty}>{qty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeFromCart(item._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section - Order Summary (Conditional) */}
      {cart.length > 0 && (
        <div className="space-y-6">
          <div className="border p-4 rounded shadow">
            <h2 className="font-bold mb-4">Order Summary</h2>

            <div className="mb-2 text-sm font-medium text-indigo-600">
              Membership: <span className="font-bold">{membership}</span>
            </div>

            <div className="flex justify-between text-sm">
              <p>Total price (Inc GST)</p>
              <p>₹{totalPrice.toFixed(0)}</p>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <p>Discount</p>
                <p className="text-green-600">- ₹{discount.toFixed(0)}</p>
              </div>
            )}

            <div className="flex justify-between text-sm">
             <p>Shipping Fee</p>
             {shippingFee === 0 ? (
             <p>
            <span className="line-through text-gray-500 mr-1">₹199</span>
            <span className="text-green-600 font-medium">Free</span>
            </p>
            ) : (
           <p>₹{shippingFee}</p>
           )}
           </div>


            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₹{finalTotal.toFixed(0)}</p>
            </div>

            {discount > 0 && (
              <p className="text-green-600 text-sm mt-1">You saved ₹{(discount + 199).toFixed(0)} as a Pro member</p>
            )}

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white mt-4 py-2 rounded"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Coupon / Rewards */}
          <div className="border p-4 rounded shadow text-sm space-y-4">
            <div className="flex justify-between items-center">
              <span>Sporty Rewards: ₹0</span>
              <input type="checkbox" />
            </div>
            <div>
              <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded text-sm">Apply Coupon</button>
            </div>
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
            <div className="border p-2 rounded">Easy returns</div>
            <div className="border p-2 rounded">Home Delivery at Your Doorstep</div>
            <div className="border p-2 rounded">Minimum 2 years warranty</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;