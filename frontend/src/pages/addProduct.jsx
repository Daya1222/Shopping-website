import { useRef, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function AddProduct() {
  const [step, setStep] = useState(1);

  // Form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Error states
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [imageError, setImageError] = useState("");

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Health & Personal Care",
    "Groceries",
    "Toys & Games",
  ];

  // Refs for inputs
  const fileInputRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageError("");
    }
  };

  const validateStep1 = () => {
    let isValid = true;

    // Clear all errors first
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setStockError("");
    setCategoryError("");

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    }

    // Validate description
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else if (description.trim().length < 10) {
      setDescriptionError("Description must be at least 10 characters");
      isValid = false;
    }

    // Validate price
    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    } else if (parseFloat(price) <= 0) {
      setPriceError("Price must be greater than 0");
      isValid = false;
    }

    // Validate stock
    if (!stock) {
      setStockError("Stock is required");
      isValid = false;
    } else if (parseInt(stock) < 0) {
      setStockError("Stock cannot be negative");
      isValid = false;
    }

    // Validate category
    if (!category) {
      setCategoryError("Please select a category");
      isValid = false;
    }

    return isValid;
  };

  const validateStep2 = () => {
    setImageError("");
    if (!image) {
      setImageError("Please upload an image");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleEnterKey = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (validateStep2()) {
      try {
        // Create FormData for image upload
        const formData = new FormData();
        formData.append("image", image);

        // Upload image
        const imageResponse = await axios.post(
          `${API_BASE}/api/images/`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        // Get the image URL from response
        const imgUrl = imageResponse.data.image;

        const productResponse = await axios.post(
          `${API_BASE}/api/product/`,
          {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            image: imgUrl,
          },

          {
            withCredentials: true,
          },
        );

        if (imageResponse.status === 200 && productResponse.status === 200) {
          console.log("Product created successfully:", productResponse.data);

          // Reset form
          setName("");
          setDescription("");
          setPrice("");
          setStock("");
          setCategory("");
          setImage(null);
          setImagePreview(null);
          setStep(1);

          // Show success message (you can replace with a toast notification)
          alert("Product published successfully!");
        }
      } catch (error) {
        console.error("Error publishing product:", error);

        if (error.response) {
          console.error("Backend error:", error.response.data);
          alert(`Error: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          alert("Network error. Please check your connection.");
        } else {
          alert("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen min-h-screen bg-white p-4">
      {/* First Page */}
      {step === 1 && (
        <div className="bg-white rounded-2xl w-full max-w-2xl space-y-4">
          {/* Heading */}
          <div className="flex justify-center font-medium text-2xl mt-4">
            Product Details
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, descriptionRef)}
              className="w-full bg-gray-200 p-2 rounded"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>
            <textarea
              ref={descriptionRef}
              placeholder="Describe the product.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, priceRef)}
              className="w-full bg-gray-200 p-2 rounded resize-none h-24"
            />
            {descriptionError && (
              <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price:
            </label>
            <input
              ref={priceRef}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, stockRef)}
              className="w-full bg-gray-200 p-2 rounded"
            />
            {priceError && (
              <p className="text-red-500 text-sm mt-1">{priceError}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Stock:
            </label>
            <input
              ref={stockRef}
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, categoryRef)}
              className="w-full bg-gray-200 p-2 rounded"
            />
            {stockError && (
              <p className="text-red-500 text-sm mt-1">{stockError}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category:
            </label>
            <select
              ref={categoryRef}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-200 p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-200 cursor-pointer hover:bg-gray-300"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {categoryError && (
              <p className="text-red-500 text-sm mt-1">{categoryError}</p>
            )}
          </div>

          <div className="flex justify-center w-full">
            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 m-10"
              onClick={handleNext}
            >
              Next <ArrowBigRight />
            </button>
          </div>
        </div>
      )}

      {/* Second Page */}
      {step === 2 && (
        <div className="flex flex-col justify-center items-center bg-white w-full max-w-2xl mt-8 space-y-4">
          {/* Heading */}
          <div className="font-medium text-2xl">Upload Image</div>

          {!imagePreview && (
            <div
              onClick={handleDivClick}
              className="w-full h-40 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
            >
              <span className="text-gray-600">Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}

          {imagePreview && (
            <div className="flex justify-center items-center bg-gray-300 rounded overflow-hidden ">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-contain w-full h-full"
              />
            </div>
          )}

          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

          <div className="flex gap-4">
            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200"
              onClick={handleSubmit}
            >
              Publish Product <ArrowBigRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
