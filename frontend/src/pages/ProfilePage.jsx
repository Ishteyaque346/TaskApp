import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { usersAPI } from '../api/users.js';

export const ProfilePage = () => {
  const { user, updateUser, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Load profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        // If user already in context, use that
        if (user) {
          setProfileData(user);
        } else {
          // Otherwise fetch from API
          const profile = await usersAPI.getProfile();
          setProfileData(profile);
          updateUser(profile);
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Only load if authenticated
    if (!authLoading) {
      loadProfile();
    }
  }, [authLoading, user, updateUser]);

  // ✅ Show loading spinner
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ✅ Show error if loading failed
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  // ✅ Show profile data
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Render profile content here */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600 mb-8">Welcome, {profileData.name}!</p>
        
        {/* Your profile content */}
      </div>
    </div>
  );
};