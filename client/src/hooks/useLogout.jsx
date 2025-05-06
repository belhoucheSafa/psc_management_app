import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Send logout request to server
      await axios.post('/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Clear client-side storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Update context
      dispatch({ type: 'LOGOUT' });
      
      // Redirect to login
      navigate('/admin/login');
      
      toast.success('Logged out successfully');

    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  return { logout };
};