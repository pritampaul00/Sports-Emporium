import { useSelector } from "react-redux";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "@/utils/loadRazorpay";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const user = useSelector((state) => state.auth.user);
  const shippingAddress = useSelector((state) => state.auth.shippingAddress);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/account/addresses");
    }
  }, [shippingAddress, navigate]);

  const membership = user?.membership?.level || "Basic";
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = membership === "Basic" ? 199 : 0;
  const discount = membership === "Pro" ? totalPrice * 0.05 : 0;
  const finalTotal = totalPrice - discount + shippingFee;

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK failed to load");

    try {
      const { data } = await axios.post("/api/payment/create-order", {
        amount: finalTotal,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Sports Emporium",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const token = user?.token || localStorage.getItem("token");

            const orderItems = cart
              .filter((item) => !item.isMembership)
              .map((item) => ({
                productId: item._id,
                qty: item.quantity,
              }));

            const membershipOrderItems = cart
              .filter((item) => item.isMembership)
              .map((item) => ({
                level: item.level,
                duration: item.duration,
                price: item.price,
              }));

            const createOrderRes = await axios.post(
              "/api/orders",
              {
                orderItems,
                membershipOrderItems,
                shippingAddress: {
                  address: `${shippingAddress.line1}, ${shippingAddress.line2 || ""}`,
                  city: shippingAddress.city,
                  postalCode: shippingAddress.zip,
                  country: shippingAddress.country,
                  state: shippingAddress.state,
                },
                paymentMethod: "Razorpay",
                taxPrice: 0,
                shippingPrice: shippingFee,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const orderId = createOrderRes.data._id;

            await axios.put(
              `/api/orders/${orderId}/pay`,
              {
                id: response.razorpay_payment_id,
                status: "COMPLETED",
                update_time: new Date().toISOString(),
                email_address: user?.email,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            clearCart();
            navigate("/account/orders");
          } catch (err) {
            console.error("❌ Error recording payment:", err);
            alert("Payment was successful but order could not be recorded.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment setup failed:", err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {!cart.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Shipping Address */}
          <div className="border rounded shadow p-4 space-y-1">
            <h2 className="font-semibold text-lg">Delivering to {user?.name}</h2>
            <p className="text-sm">{shippingAddress?.line1}, {shippingAddress?.line2}</p>
            <p className="text-sm">
              {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.zip}
            </p>
            <p className="text-sm">{shippingAddress?.country}</p>
            <p className="text-sm">Phone: {shippingAddress?.phone || user?.phone}</p>
          </div>

          {/* Order Summary */}
          <div className="border rounded shadow p-4 space-y-4">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>

            <div className="mb-2 text-sm font-medium text-indigo-600">
              Membership: <span className="font-bold">{membership}</span>
            </div>

            <ul className="text-sm space-y-2">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                </li>
              ))}
            </ul>

            <hr className="my-2" />

            <div className="flex justify-between text-sm">
              <span>Subtotal (Incl. GST)</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹{discount.toFixed(0)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span>Shipping Fee</span>
              {shippingFee === 0 ? (
                <span>
                  <span className="line-through text-gray-500 mr-1">₹199</span>
                  <span className="text-green-600 font-medium">Free</span>
                </span>
              ) : (
                <span>₹{shippingFee}</span>
              )}
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(0)}</span>
            </div>

            {discount > 0 && (
              <p className="text-green-600 text-sm mt-1">
                You saved ₹{(discount + 199).toFixed(0)} as a Pro member
              </p>
            )}

            <button
              onClick={handlePayment}
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
