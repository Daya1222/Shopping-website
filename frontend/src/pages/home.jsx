import { ArrowRight, TrendingUp, Star } from "lucide-react";
import useUser from "../hooks/useUser";
import Footer from "../components/footer";
import useProducts from "../hooks/useProduct.jsx";
import useCart from "../hooks/useCart";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // Sample category data - replace with your actual categories
  const { user } = useUser();
  const { products } = useProducts();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const { cartItems, addItem, removeItem, clearCart } = useCart();

  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
      itemCount: "150+ Items",
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
      itemCount: "200+ Items",
    },
    {
      id: 3,
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80",
      itemCount: "180+ Items",
    },
    {
      id: 4,
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
      itemCount: "120+ Items",
    },
    {
      id: 5,
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
      itemCount: "90+ Items",
    },
    {
      id: 6,
      name: "Stationery",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      itemCount: "300+ Items",
    },
  ];

  function getRandomSubset(list, count = 5) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const getImage = (image) => {
    return image.startsWith("http") ? image : `${API_BASE}${image}`;
  };

  //Taking random sungets for different sections
  const featuredProducts = useMemo(
    () => getRandomSubset(products, 8),
    [products],
  );

  const trendingProducts = useMemo(
    () => getRandomSubset(products, 8),
    [products],
  );

  const isInCart = (product) => {
    return cartItems.some((item) => item.product._id === product._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E0F2E9] to-[#ECF8F0] overflow-auto">
      {/* Hero Banner Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(to right, #79B259, #6a9d4d)",
            }}
          >
            <div className="px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Winter Sale
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Up to 50% off on selected items. Limited time offer!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <button
              className="text-sm font-semibold flex items-center space-x-1 hover:opacity-80 transition"
              style={{ color: "#79B259" }}
              onClick={() => navigate(`/search?q=random`)}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/search?q=${category.name}`)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.itemCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <button
              className="text-sm font-semibold flex items-center space-x-1 hover:opacity-80 transition"
              onClick={() => navigate(`/search?q=featured`)}
              style={{ color: "#79B259" }}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product.slug}/${product._id}`)
                }
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={getImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                        style={{ backgroundColor: "#79B259" }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xl font-bold"
                        style={{ color: "#79B259" }}
                      >
                        &#x0930;&#x0941; {` ${product.price}`}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <button
                      className="w-full mt-3 px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition active:bg-green-400"
                      style={{ backgroundColor: "#79B259" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({ product });
                      }}
                    >
                      {isInCart(product) ? (
                        <>
                          <span className="mr-2">+</span> Add more to Cart
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8" style={{ color: "#79B259" }} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Trending Now
                </h2>
                <p className="text-gray-600">Most popular items this week</p>
              </div>
            </div>
            <button
              className="text-sm font-semibold flex items-center space-x-1 hover:opacity-80 transition"
              onClick={() => navigate("/search?q=trending")}
              style={{ color: "#79B259" }}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product.slug}/${product._id}`)
                }
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={getImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xl font-bold"
                        style={{ color: "#79B259" }}
                      >
                        &#x0930;&#x0941; {` ${product.price}`}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <button
                      className="w-full mt-3 px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition active:bg-green-400"
                      style={{ backgroundColor: "#79B259" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        addItem({ product });
                      }}
                    >
                      {isInCart(product) ? (
                        <>
                          <span className="mr-2">+</span> Add more to Cart
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}

      {!user && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-2xl p-12 text-center text-white shadow-2xl"
              style={{
                background: "linear-gradient(to right, #79B259, #6a9d4d)",
              }}
            >
              <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
              <p className="text-xl mb-8 opacity-90">
                Sign up today and get 20% off your first order
              </p>
              <button
                className="px-8 py-4 bg-white rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg"
                style={{ color: "#79B259" }}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
