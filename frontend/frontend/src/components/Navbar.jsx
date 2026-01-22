import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { authAPI } from '../api/auth.js';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TaskApp</h1>
        
        {user && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.name[0]}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
