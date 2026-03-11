import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import { toast } from 'react-toastify';
import './AuthPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email';
    if (!formData.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const data = await loginService(formData.email, formData.password);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(msg);
      if (err.response?.status === 401) setErrors({ password: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">📚 BookWagon</Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one →</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
