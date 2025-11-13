import useCart from "../hooks/useCart";
import CartItemCard from "../components/cartItemCard";
import { ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

function Cart() {
  const { cartItems, addItem, removeItem, clearCart } = useCart();
  const isCartEmpty = cartItems.length === 0;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen py-8">
        <span className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-blue-500 to-green-500 m-2 mb-8">
          Cart
        </span>
        <div className="flex flex-col items-center gap-1 w-full h-full p-2">
          {cartItems.map((item) => (
            <CartItemCard key={item.product._id} item={item} />
          ))}
        </div>
        {isCartEmpty && (
          <div className="flex flex-col w-11/12 md:w-5/6 justify-center items-center">
            <img
              src="https://cdn.dribbble.com/userupload/42192222/file/original-0eb8c11fdae4be1f445866c47f0e57f6.gif"
              className="w-60 bg-black"
              alt="tumbleweed.gif"
            />
            <div className="flex w-full rounded-lg justify-center items-center ">
              Nothing to show.
            </div>
            <button
              className="flex m-6 gap-1 items-center justify-center bg-[#79B259] p-2 rounded-lg hover:bg-[#7fa06b] active:bg-[#7fa06b] cursor-pointer text-white font-semibold py-4 px-6"
              onClick={() => navigate("/home")}
            >
              Shop now <ArrowBigRight />
            </button>
          </div>
        )}
        {!isCartEmpty && (
          <button
            className="flex m-5 gap-1 bg-[#79B259] p-2 rounded-lg w-30 text-white font-semibold py-4 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 items-center justify-center text-lg cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            Checkout <ArrowBigRight size={20} className="text-white" />
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
