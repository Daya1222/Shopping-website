import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import {
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Star,
  ArrowRight,
} from "lucide-react";

export default function EcommerceLanding() {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Curated Collections",
      description: "Discover handpicked products tailored to your style",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with express options",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Checkout",
      description: "Shop with confidence using encrypted transactions",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy on all items",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "#79B25920", color: "#79B259" }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 50,000+ customers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Shop Smarter,
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #79B259, #6a9d4d)",
                }}
              >
                {" "}
                Live Better
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Discover a seamless shopping experience with curated products,
              lightning-fast delivery, and unbeatable customer service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="group px-8 py-4 text-white rounded-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition flex items-center justify-center space-x-2 bg-gradient-to-r from-[#79B259] to-[#6a9d4d]"
                onClick={() => navigate("/register")}
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          {/* Hero Image/Graphic */}
          <div className="mt-20 relative">
            <div
              className="rounded-2xl h-96 flex items-center justify-center shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(to right, #79B259, #6a9d4d)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(121, 178, 89, 0.2), rgba(106, 157, 77, 0.2))",
                }}
              ></div>
              <div className="relative z-10 text-white text-center p-8">
                <ShoppingBag className="w-32 h-32 mx-auto mb-4 opacity-90" />
                <p className="text-2xl font-semibold">
                  Your Shopping Journey Starts Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a perfect shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: "#e5e7eb" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#79B259")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#e5e7eb")
                }
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #79B259, #6a9d4d)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-lime-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#79B259" }}
              >
                50K+
              </div>
              <div className="text-gray-600 text-lg">Happy Customers</div>
            </div>
            <div className="p-8">
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#79B259" }}
              >
                100K+
              </div>
              <div className="text-gray-600 text-lg">Products Sold</div>
            </div>
            <div className="p-8">
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#79B259" }}
              >
                4.9★
              </div>
              <div className="text-gray-600 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-12 text-center text-white shadow-2xl"
            style={{
              background: "linear-gradient(to right, #79B259, #6a9d4d)",
            }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy customers today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 text-[#79B259] bg-white rounded-lg font-semibold transition shadow-lg hover:bg-gray-100 hover:text-[79B260]"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
              <button
                className="px-8 bg-[#6a9d4d] py-4 text-white rounded-lg font-semibold transition border-2 border-white/20 hover:bg-[#5a8d3d]"
                onClick={() => navigate("/home")}
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
