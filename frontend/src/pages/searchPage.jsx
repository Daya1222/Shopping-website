import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import useProducts from "../hooks/useProduct";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import { useEffect } from "react";

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const { products } = useProducts();

  const lowerQuery = query.toLowerCase().trim();
  const categories = [
    "electronics",
    "fashion",
    "home & living",
    "sports",
    "beauty",
    "stationery",
  ];
  const specialCategories = ["featured", "trending", "random"];

  const isCategory = categories.includes(lowerQuery);
  const isSpecial = specialCategories.includes(lowerQuery);
  const isHighlighted = isCategory || isSpecial;

  let result = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isSpecial) {
    result = [...products].sort(() => 0.5 - Math.random()).slice(0, 10);
  } else if (isCategory) {
    result = products.filter((p) => p.category?.toLowerCase() === lowerQuery);
  } else if (query.trim()) {
    const fuse = new Fuse(products, {
      keys: ["name", "category", "description"],
      threshold: 0.3,
    });
    result = fuse.search(query).map((r) => r.item);
  }

  if (result.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Results Found
            </h2>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <div className="flex-1">
        <div className={`py-8 ${isHighlighted ? "text-center" : "px-6"}`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isHighlighted ? (
              <span className="capitalize">{query}</span>
            ) : (
              <>
                Search Results for{" "}
                <span style={{ color: "#79B259" }}>"{query}"</span>
              </>
            )}
          </h1>
          <p className="text-gray-600">
            {result.length} {result.length === 1 ? "item" : "items"} found
          </p>
        </div>

        <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 px-2 pb-8">
          {result.map((item) => (
            <ProductCard
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              stars={item.rating.average}
              totalRatings={item.rating.totalRatings}
              slug={item.slug}
              variant={"buyer"}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
