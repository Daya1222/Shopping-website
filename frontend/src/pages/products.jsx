import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";
import { Plus, Store, Package } from "lucide-react";
import useProducts from "../hooks/useProduct";
import useUser from "../hooks/useUser.jsx";
import Footer from "../components/footer.jsx";

function Product() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { user } = useUser();

  const userProducts = products.filter((item) => item.sellerId === user._id);

  // If user is a buyer, show become seller prompt
  if (user.role === "buyer") {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full">
              <Store size={48} className="text-blue-600" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Start Selling Today
              </h2>
              <p className="text-lg text-gray-600">
                Become a seller to publish and manage your products. Reach
                thousands of potential customers!
              </p>
            </div>
            <button
              onClick={() => navigate("/become-seller")}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              Become a Seller
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If user is seller/admin but has no products
  if (userProducts.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full">
              <Package size={48} className="text-green-600" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                No Products Yet
              </h2>
              <p className="text-lg text-gray-600">
                You haven't added any products yet. Start by adding your first
                product to get started!
              </p>
            </div>
            <button
              onClick={() => navigate("/seller/add-product")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <Plus size={24} />
              <span>Add Your First Product</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If user is seller/admin with products
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Products
              </h1>
              <p className="text-gray-600 mt-1">
                {userProducts.length}{" "}
                {userProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
            <button
              onClick={() => navigate("/seller/add-product")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {userProducts.map((item) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                stars={item.rating.average}
                totalRatings={item.rating.totalRatings}
                slug={item.slug}
                variant={
                  ["seller", "admin"].includes(user.role) ? "seller" : "buyer"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
