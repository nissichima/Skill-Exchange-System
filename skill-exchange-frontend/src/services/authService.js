import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth'; // Adjust to match your backend URL

// Signup Function
export const signup = async (userData) => {
  console.log('Calling signup API with:', userData); // Debug log
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.error || 'Signup failed';
  }
  return await response.json();
};


// Login Function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

// Logout Function
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Logout failed';
  }
};

