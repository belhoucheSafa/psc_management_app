import { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AdminLayout from '../../../layouts/AdminLayout';

const AdminDashboard = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch admin dashboard data here
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Welcome, {user?.name}</h1>
        <div className="dashboard-stats">
          {/* Add your admin dashboard widgets here */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;