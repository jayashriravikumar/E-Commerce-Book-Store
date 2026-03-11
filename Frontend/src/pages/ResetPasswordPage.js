import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import { toast } from 'react-toastify';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.password !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwords.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(token, passwords.password);
      toast.success(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="form-wrapper">
          <h1>Reset Password</h1>
          <p className="subtitle">Enter your new password below</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={passwords.password}
                onChange={(e) => setPasswords({...passwords, password: e.target.value})}
                required
                placeholder="Enter new password"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                required
                placeholder="Confirm new password"
                minLength="6"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
