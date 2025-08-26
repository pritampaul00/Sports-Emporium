import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = user?.token || localStorage.getItem("token");
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (loading) return <p className="p-4">Loading order...</p>;
  if (!order) return <p className="p-4 text-red-500">Order not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.isPaid ? "Paid ✅" : "Not Paid ❌"}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <p>
          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <ul className="list-disc ml-6">
          {order.orderItems.map((item) => (
            <li key={item.productId}>
              {item.name} x {item.qty} = ₹{item.price * item.qty}
              
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p><strong>Shipping Fee:</strong> ₹{order.shippingPrice}</p>
        <p><strong>Total:</strong> ₹{order.totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
