import { useRef, useState } from "react";
import { ArrowBigRight, Plus } from "lucide-react";

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

  const categories = ["Electronics", "Clothing", "Books", "Home", "Toys"];

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store File for upload
      const previewUrl = URL.createObjectURL(file); // Create preview URL
      setImagePreview(previewUrl); // Store preview separately
    }
  };

  const handleSubmit = async () => {};

  return (
    <div className="flex flex-col items-center max-w-screen h-full bg-white">
      {/* First Page */}

      {step === 1 && (
        <div className="m-4 bg-white rounded-2xl w-10/12 space-y-4">
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-200 p-2 rounded"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>

            <textarea
              placeholder="Describe the product.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-200 p-2 rounded resize-none"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-200 p-2 rounded"
            />
          </div>
          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Stock:
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-gray-200 p-2 rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category:
            </label>
            <select
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
          </div>

          <div className=" flex justify-center w-full">
            <button
              className=" text-xl text-gray-600 hover:text-gray-900 w-25 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 m-10"
              onClick={() => setStep(2)}
            >
              Next <ArrowBigRight />
            </button>
          </div>
        </div>
      )}

      {/* Second Page */}

      {step === 2 && (
        <div className="flex flex-col justify-center items-center bg-white w-10/12 mt-8 space-y-4">
          {/* Heading */}
          <div className="  font-medium text-2xl">Upload Image</div>
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
            <div className="flex justify-center items-center bg-gray-300 rounded overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <button
              className=" text-xl text-gray-600 hover:text-gray-900 w-50 h-10 rounded-sm flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 transition duration-200 m-10"
              onClick={() => handleSubmit}
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
