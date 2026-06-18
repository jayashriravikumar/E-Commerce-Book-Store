import React from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, adminOnly = false }) => {
    const {isAuthenticated, loading, user } = useSelector((state) => state.user);
    if (loading) {
        return <p>Loading.......</p>;
    }

    if(!isAuthenticated){
        return<Navigate to="/login" />;
    }

    if(adminOnly && user.role != "admin") {
        return <Navigate to="/" />;
    }
  return <div>ProtectedRoute</div>
};

export default ProtectedRoute;
