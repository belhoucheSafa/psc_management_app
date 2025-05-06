import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/users/login', { email, password });
      const { token, data } = response.data;

      // Verify the user is an admin
      if (!['admin', 'super-admin'].includes(data.user.role)) {
        throw new Error('Access restricted to administrators only');
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', token);

      // Update auth context
      dispatch({ type: 'LOGIN', payload: { user: data.user, token } });

      // Redirect to admin dashboard
      navigate('/admin/dashboard');

      toast.success(`Welcome back, ${data.user.name}!`);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};