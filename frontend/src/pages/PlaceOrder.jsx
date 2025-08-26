import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = user?.token || localStorage.getItem("token");
      const { data } = await axios.get("/api/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  if (orders.length === 0) return <p className="p-4">No orders found.</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded shadow-sm p-4 flex flex-col gap-4"
        >
          {/* TOP SECTION */}
          <div className="flex justify-between text-sm text-gray-700">
            <div>
              <p className="font-semibold">ORDER PLACED</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">TOTAL</p>
              <p>₹{order.totalPrice}</p>
            </div>
            <div>
              <p className="font-semibold">SHIP TO</p>
              {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              <p>{user.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs">ORDER #{order._id}</p>
              <div className="space-x-2">
                <Link
                  to={`/account/orders/${order._id}`}
                  className="text-blue-600 underline text-sm"
                >
                  View order details
                </Link>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Invoice</button>
              </div>
            </div>
          </div>

          {/* DELIVERY STATUS */}
          <div>
            <p className="text-lg font-medium text-green-700">
              {order.isDelivered
                ? `Delivered ${new Date(order.deliveredAt).toLocaleDateString()}`
                : "Not Delivered Yet"}
            </p>
            {order.isDelivered && <p className="text-sm text-gray-500">Package was handed to resident</p>}
          </div>

          {/* PRODUCT SECTION */}
          {order.orderItems.map((item) => (
            <div key={item.productId} className="flex items-start gap-4">
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                className="w-24 h-24 object-cover border"
              />
              <div className="flex-1">
                <Link to={`/products/${item.category}/${item.subcategory}`} className="font-semibold text-blue-700">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">
                  Replace item: Eligible till{" "}
                  {new Date(new Date(order.deliveredAt).getTime() + 7 * 86400000).toLocaleDateString()}
                </p>
                <button className="bg-yellow-400 px-4 py-1 text-sm">
                  View your item
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-2">
                <button className="bg-gray-200 px-4 py-1 text-sm rounded">Get product support</button>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Track package</button>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Replace item</button>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Share gift receipt</button>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Leave seller feedback</button>
                <button className="bg-yellow-400 px-4 py-1 text-sm rounded">Write a product review</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlaceOrder;






