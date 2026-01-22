import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { usersAPI } from "../api/users.js";
import { Toast } from "../components/Toast.jsx";
import { formatDateTime } from "../utils/formatters.js";

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setFormData({
      name: user.name,
      email: user.email,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await usersAPI.updateProfile({
        name: formData.name,
        email: formData.email,
      });

      // Update global auth context
      updateUser(response.user);

      setIsEditing(false);
      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Failed to update profile";
      setToast({
        message: errorMsg,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {toast && (
        <div className="fixed top-4 right-4">
          <Toast {...toast} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section with Avatar */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar & Name Section */}
            <div className="flex flex-col items-center -mt-16 mb-6">
              <div className="w-32 h-32 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                <img
                  src="Alam.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mt-4 text-center">
                {user.name}
              </h2>
            </div>

            {/* View Mode - Show Current Data */}
            {!isEditing && (
              <>
                {/* Profile Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email Address
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.email}
                    </p>
                  </div>

                  {/* User ID */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      User ID
                    </label>
                    <p className="text-sm font-mono text-gray-900 break-all">
                      {user._id}
                    </p>
                  </div>

                  {/* Account Created */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Account Created
                    </label>
                    <p className="text-lg text-gray-900">
                      {formatDateTime(user.createdAt)}
                    </p>
                  </div>

                  {/* Last Updated */}
                  <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Last Updated
                    </label>
                    <p className="text-lg text-gray-900">
                      {formatDateTime(user.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={handleEditClick}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              </>
            )}

            {/* Edit Mode - Show Form */}
            {isEditing && (
              <form onSubmit={handleSave} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Note */}
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
                  Password changes are not available here. Contact support if
                  you need to change your password.
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? "Saving..." : " Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
