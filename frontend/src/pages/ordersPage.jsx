import React, { useState, useEffect } from "react";
import {
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  ShoppingBag,
  User,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function OrdersPage() {
  const [user, setUser] = useState({ role: "seller" });
  const role = user.role;
  const [buyingOrders, setBuyingOrders] = useState([]);
  const [sellingOrders, setSellingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInterface, setActiveInterface] = useState("buying");

  const isSeller = role === "seller" || role === "admin";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const buyingResponse = await axios.get(`${API_BASE}/api/order`, {
        params: { type: "buying" },
        withCredentials: true,
      });
      setBuyingOrders(buyingResponse.data);

      if (isSeller) {
        const sellingResponse = await axios.get(`${API_BASE}/api/order`, {
          params: { type: "selling" },
          withCredentials: true,
        });
        setSellingOrders(sellingResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (
      !window.confirm("Are you sure you want to cancel and delete this order?")
    ) {
      return;
    }

    try {
      await axios.patch(
        `${API_BASE}/api/order/${orderId}/cancel`,
        {},
        { withCredentials: true },
      );

      setBuyingOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert(error.response?.data?.error || "Failed to cancel order");
    }
  };

  const handleConfirmOrder = async (orderId) => {
    if (!window.confirm("Mark this order as shipped?")) {
      return;
    }

    try {
      await axios.patch(
        `${API_BASE}/api/order/${orderId}/confirm`,
        {},
        { withCredentials: true },
      );

      setSellingOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "shipped" } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to confirm order:", error);
      alert(error.response?.data?.error || "Failed to confirm order");
    }
  };

  const handleConfirmReceived = async (orderId) => {
    if (!window.confirm("Confirm that you have received this order?")) {
      return;
    }

    try {
      await axios.patch(
        `${API_BASE}/api/order/${orderId}/received`,
        {},
        { withCredentials: true },
      );

      setBuyingOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "completed" } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to confirm received:", error);
      alert(error.response?.data?.error || "Failed to confirm received");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderBuyerOrderCard = (order) => {
    const totalQuantity = order.products.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const productNames = order.products
      .map((item) => item.product?.name)
      .filter(Boolean)
      .join(", ");
    const sellers = order.sellers.map((s) => s.name).join(", ");

    return (
      <div
        key={order._id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-gray-100"
      >
        <div
          style={{ backgroundColor: "#77AF57" }}
          className="px-6 py-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-white" size={24} />
            <div>
              <p className="text-white font-semibold text-lg">
                Order #{order._id.slice(-8)}
              </p>
              <p className="text-white text-sm opacity-90">
                {productNames || "Multiple items"}
              </p>
            </div>
          </div>
          <div
            className={`${getStatusColor(order.status)} px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm`}
          >
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Seller</p>
                <p className="font-medium text-gray-800">{sellers || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium text-gray-800">
                  {totalQuantity} item(s)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium text-gray-800">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
            <MapPin
              style={{ color: "#77AF57" }}
              className="mt-1 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium text-gray-800">
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Items</p>
            <div className="space-y-2">
              {order.products.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product?.name || "Unknown Product"} (x{item.quantity})
                  </span>
                  <span className="font-medium text-gray-800">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {order.status === "pending" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <XCircle size={20} />
                Cancel Order
              </button>
            )}
            {order.status === "shipped" && (
              <button
                onClick={() => handleConfirmReceived(order._id)}
                style={{ backgroundColor: "#77AF57" }}
                className="flex-1 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-opacity duration-200 flex items-center justify-center gap-2"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6a9d4f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#77AF57")
                }
              >
                <CheckCircle size={20} />
                Confirm Received
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSellerOrderCard = (order) => {
    const totalQuantity = order.products.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const productNames = order.products
      .map((item) => item.product?.name)
      .filter(Boolean)
      .join(", ");
    const buyerName = order.buyer?.name || "N/A";

    return (
      <div
        key={order._id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-gray-100"
      >
        <div
          style={{ backgroundColor: "#77AF57" }}
          className="px-6 py-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <Package className="text-white" size={24} />
            <div>
              <p className="text-white font-semibold text-lg">
                Order #{order._id.slice(-8)}
              </p>
              <p className="text-white text-sm opacity-90">
                {productNames || "Multiple items"}
              </p>
            </div>
          </div>
          <div
            className={`${getStatusColor(order.status)} px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm`}
          >
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Buyer</p>
                <p className="font-medium text-gray-800">{buyerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium text-gray-800">
                  {totalQuantity} item(s)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign
                style={{ color: "#77AF57" }}
                className="mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium text-gray-800">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
            <MapPin
              style={{ color: "#77AF57" }}
              className="mt-1 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium text-gray-800">
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Items</p>
            <div className="space-y-2">
              {order.products.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product?.name || "Unknown Product"} (x{item.quantity})
                  </span>
                  <span className="font-medium text-gray-800">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {order.status === "pending" && (
              <button
                onClick={() => handleConfirmOrder(order._id)}
                style={{ backgroundColor: "#77AF57" }}
                className="flex-1 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-opacity duration-200 flex items-center justify-center gap-2"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6a9d4f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#77AF57")
                }
              >
                <Truck size={20} />
                Mark as Shipped
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto mb-4"
            style={{ borderTopColor: "#77AF57" }}
          ></div>
          <p className="text-gray-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            {activeInterface === "buying"
              ? "Track and manage your purchases"
              : "Manage customer orders"}
          </p>
        </div>

        {isSeller && (
          <div className="mb-6 flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveInterface("buying")}
              className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                activeInterface === "buying"
                  ? "border-b-4 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={
                activeInterface === "buying" ? { borderColor: "#77AF57" } : {}
              }
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                My Purchases ({buyingOrders.length})
              </div>
            </button>
            <button
              onClick={() => setActiveInterface("selling")}
              className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                activeInterface === "selling"
                  ? "border-b-4 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={
                activeInterface === "selling" ? { borderColor: "#77AF57" } : {}
              }
            >
              <div className="flex items-center gap-2">
                <Package size={20} />
                My Sales ({sellingOrders.length})
              </div>
            </button>
          </div>
        )}

        <div className="space-y-6">
          {activeInterface === "buying" ? (
            buyingOrders.length > 0 ? (
              buyingOrders.map((order) => renderBuyerOrderCard(order))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No purchases yet
                </h3>
                <p className="text-gray-500">
                  Start shopping to see your orders here!
                </p>
              </div>
            )
          ) : sellingOrders.length > 0 ? (
            sellingOrders.map((order) => renderSellerOrderCard(order))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No sales yet
              </h3>
              <p className="text-gray-500">
                Orders from customers will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
