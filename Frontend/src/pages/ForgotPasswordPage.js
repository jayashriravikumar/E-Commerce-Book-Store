import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/authService';
import { toast } from 'react-toastify';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      setSent(true);
      toast.success(data.message);
      
      // In development, show reset URL
      if (data.resetUrl) {
        console.log('Reset URL:', data.resetUrl);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="forgot-password-page">
        <div className="container">
          <div className="form-wrapper">
            <div className="success-message">
              <h2>✓ Check Your Email</h2>
              <p>If an account exists with {email}, you will receive a password reset link shortly.</p>
              <Link to="/login" className="btn btn-primary">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="form-wrapper">
          <h1>Forgot Password</h1>
          <p className="subtitle">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="form-footer">
            <Link to="/login">Back to Login</Link>
            <span>•</span>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
