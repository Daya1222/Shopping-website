import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Heart,
  MapPin,
  Edit2,
  Save,
  X,
  Store,
} from "lucide-react";
import useUser from "../hooks/useUser.jsx";
import axios from "axios";

function Profile() {
  const { user, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto mb-4"
            style={{ borderTopColor: "#77AF57" }}
          ></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEdit = () => {
    const editData = {
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    };

    // Admins cannot change their role
    if (user.role?.toLowerCase() !== "admin") {
      editData.role = user.role || "buyer";
    }

    setEditedUser(editData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      console.log(API_BASE);
      const response = await axios.patch(
        `${API_BASE}/api/user/${user._id}`,
        editedUser,
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      console.log(data);

      setIsEditing(false);
      await refreshUser();
    } catch (error) {
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section with Profile Picture */}
          <div
            style={{ backgroundColor: "#77AF57" }}
            className="px-6 py-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <img
              src={user.profilePicUrl || "https://via.placeholder.com/150"}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <p className="text-white opacity-90 mb-3">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role?.toLowerCase() === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : user.role?.toLowerCase() === "seller"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </span>
                {user.isVerified && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="sm:ml-auto">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  style={{ backgroundColor: "white", color: "#77AF57" }}
                  className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
                >
                  <Edit2 size={20} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={20} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User style={{ color: "#77AF57" }} size={24} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{user.name}</p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{user.email}</p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      placeholder="Add phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {user.phoneNumber || "Not provided"}
                    </p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">User ID</p>
                  <p className="font-medium text-gray-900 font-mono text-sm">
                    {user._id}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin style={{ color: "#77AF57" }} size={24} />
                Address
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                {isEditing ? (
                  <textarea
                    value={editedUser.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Add your address"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : user.address ? (
                  <p className="font-medium text-gray-900">{user.address}</p>
                ) : (
                  <p className="text-gray-500 italic">No address added</p>
                )}
              </div>
            </div>

            {/* Account Role - Only show for buyers and sellers, NOT admins */}
            {user.role !== "admin" &&
              user.role !== "Admin" &&
              user.role !== "ADMIN" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Store style={{ color: "#77AF57" }} size={24} />
                    Account Type
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-3">
                      Switch between Buyer and Seller accounts
                    </p>
                    {isEditing ? (
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="role"
                            value="buyer"
                            checked={editedUser.role === "buyer"}
                            onChange={(e) =>
                              handleInputChange("role", e.target.value)
                            }
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Buyer</p>
                            <p className="text-sm text-gray-500">
                              Browse and purchase products
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="role"
                            value="seller"
                            checked={editedUser.role === "seller"}
                            onChange={(e) =>
                              handleInputChange("role", e.target.value)
                            }
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Seller</p>
                            <p className="text-sm text-gray-500">
                              List and sell your products
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            user.role === "seller"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="font-medium">
                            {user.role === "seller"
                              ? "Seller Account"
                              : "Buyer Account"}
                          </p>
                          <p className="text-sm opacity-80">
                            {user.role === "seller"
                              ? "You can list and sell products"
                              : "You can browse and purchase products"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Account Status */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield style={{ color: "#77AF57" }} size={24} />
                Account Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Verified</p>
                    <p className="font-medium text-gray-900">
                      {user.isVerified ? "Yes" : "No"}
                    </p>
                  </div>
                  {user.isVerified ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active</p>
                    <p className="font-medium text-gray-900">
                      {user.isActive ? "Yes" : "No"}
                    </p>
                  </div>
                  {user.isActive ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Complete</p>
                    <p className="font-medium text-gray-900">
                      {user.isComplete ? "Yes" : "No"}
                    </p>
                  </div>
                  {user.isComplete ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
              </div>
            </div>

            {/* Activity Statistics */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag style={{ color: "#77AF57" }} size={24} />
                Activity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <ShoppingBag
                    className="mx-auto mb-2"
                    style={{ color: "#77AF57" }}
                    size={32}
                  />
                  <p className="text-2xl font-bold text-gray-900">
                    {user.orders?.length || 0}
                  </p>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Heart
                    className="mx-auto mb-2"
                    style={{ color: "#77AF57" }}
                    size={32}
                  />
                  <p className="text-2xl font-bold text-gray-900">
                    {user.wishlist?.length || 0}
                  </p>
                  <p className="text-sm text-gray-500">Wishlist Items</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <ShoppingBag
                    className="mx-auto mb-2"
                    style={{ color: "#77AF57" }}
                    size={32}
                  />
                  <p className="text-2xl font-bold text-gray-900">
                    {user.cart?.length || 0}
                  </p>
                  <p className="text-sm text-gray-500">Cart Items</p>
                </div>
              </div>
            </div>

            {/* Account Dates */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar style={{ color: "#77AF57" }} size={24} />
                Account Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Integration */}
            {user.googleId && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Connected with Google
                    </p>
                    <p className="text-sm text-gray-600">
                      ID: {user.googleId.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
