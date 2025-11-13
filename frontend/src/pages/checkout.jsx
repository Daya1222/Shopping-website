import { ShoppingBag, CreditCard, Package } from "lucide-react";
import useCart from "../hooks/useCart";
import Footer from "../components/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    const products = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        `${API_BASE}/api/order/`,
        { products },
        { withCredentials: true },
      );
      console.log(response);
      alert("Order Successfully Placed");
      clearCart();
      navigate("/home");
    } catch (error) {
      console.log("Error placing order", error.message);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
        <h1 className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-blue-500 to-green-500 m-2 mb-8">
          Checkout
        </h1>

        <div className="w-10/12 md:w-4/6 max-w-3xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Receipt Section */}
          <div className="p-6 md:p-8">
            {/* Order Summary Header */}
            <div className="flex items-center mb-6 pb-4 border-b-2 border-gray-100">
              <Package className="w-6 h-6 mr-3" style={{ color: "#79B259" }} />
              <h2 className="text-2xl font-semibold text-gray-800">
                Order Summary
              </h2>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity}x &#x0930;&#x0941;{" "}
                        {item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg ml-4">
                      &#x0930;&#x0941; {itemTotal.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-3 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between text-gray-600 text-base">
                <span>Subtotal</span>
                <span className="font-medium">
                  {" "}
                  &#x0930;&#x0941; {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 text-base">
                <span>Tax (8%)</span>
                <span className="font-medium">
                  {" "}
                  &#x0930;&#x0941; {tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 text-base">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-[#79B259] font-semibold">FREE</span>
                  ) : (
                    `${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t-2 border-gray-300">
                <span>Total</span>
                <span style={{ color: "#79B259" }}>
                  {" "}
                  &#x0930;&#x0941; {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <button
              onClick={handlePlaceOrder}
              className="w-full text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg cursor-pointer"
              style={{ backgroundColor: "#79B259" }}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Place Order
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Secure checkout · Free returns within 30 days
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
