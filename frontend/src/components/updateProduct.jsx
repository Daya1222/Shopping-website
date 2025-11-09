import { useRef, useState, useEffect } from "react";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Cross,
  Edit2Icon,
  EraserIcon,
  ImageIcon,
} from "lucide-react";
import axios from "axios";
import useProducts from "../hooks/useProduct";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function UpdateProduct({ productId, setStatus }) {
  const [step, setStep] = useState(1);

  const { refetchProducts, products } = useProducts();

  // Form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isNewImage, setIsNewImage] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [imageError, setImageError] = useState("");

  const reqProduct = products.find((item) => item._id === productId);

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

  // Initialize form with existing product data
  useEffect(() => {
    if (reqProduct) {
      setName(reqProduct.name);
      setDescription(reqProduct.description);
      setPrice(reqProduct.price.toString());
      setStock(reqProduct.stock.toString());
      setCategory(reqProduct.category);
      setImagePreview(reqProduct.image); // Set existing image URL as preview
      setIsNewImage(false);
    }
  }, [reqProduct]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setIsNewImage(true);
      setImageError("");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(reqProduct.image); // Reset to original image
    setIsNewImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        let imgUrl = reqProduct.image;

        if (isNewImage && image) {
          const formData = new FormData();
          formData.append("image", image);

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

          imgUrl = imageResponse.data.image;
        }

        // TODO: Replace this with your actual product update endpoint
        // Example: PUT or PATCH request to update the product

        const productResponse = await axios.put(
          `${API_BASE}/api/product/${productId}`,
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

        if (productResponse.status === 200) {
          console.log("Product updated successfully:", productResponse.data);
          await refetchProducts();
          setStatus(false);
          alert("Product updated successfully!");
        }
      } catch (error) {
        console.error("Error updating product:", error);

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
    <div className="flex flex-col rounded-md items-center w-full max-w-screen h-full max-h-full overflow-scroll bg-white p-4 text-gray-700 font-medium">
      {/* First Page */}
      {step === 1 && (
        <div className="bg-white rounded-2xl w-full max-w-2xl space-y-4">
          {/* Heading */}
          <div className="text-gray-700 flex justify-center items-center font-medium text-2xl mt-4">
            <Edit2Icon className="m-3" />
            Edit Product Details
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
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 m-5"
              onClick={() => setStatus(false)}
            >
              Cancel <EraserIcon />
            </button>

            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 m-5"
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
          <div className="font-medium text-2xl flex items-center gap-2">
            <ImageIcon /> Update Product Image
          </div>

          <p className="text-gray-600 text-sm text-center">
            {isNewImage
              ? "New image selected. Click 'Keep Current Image' to revert."
              : "Current image is shown. Click to upload a new image."}
          </p>

          {/* Image Preview Area */}
          <div className="w-full flex flex-col items-center space-y-3">
            <div
              onClick={handleDivClick}
              className="w-full max-w-md h-64 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 transition overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-gray-600">Click to upload image</span>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {isNewImage && (
              <button
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                onClick={handleRemoveImage}
              >
                Keep Current Image (Undo Changes)
              </button>
            )}
          </div>

          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

          <div className="flex gap-4">
            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200"
              onClick={() => setStep(1)}
            >
              <ArrowBigLeft /> Back
            </button>
            <button
              className="text-xl text-gray-600 hover:text-gray-900 px-6 h-fit rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 p-2"
              onClick={handleSubmit}
            >
              Update Product <ArrowBigRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
