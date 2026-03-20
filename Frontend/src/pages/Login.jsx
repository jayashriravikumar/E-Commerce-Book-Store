import { useContext, useEffect, useMemo, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BookStoreLogo from "../components/BookStoreLogo";
import { auth, provider } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const authModes = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to continue your reading journey.",
    primaryLabel: "Sign In",
    helper: "New here?",
    switchLabel: "Create an account"
  },
  register: {
    title: "Create your account",
    subtitle: "Join BookStore and build your own curated shelf.",
    primaryLabel: "Register",
    helper: "Already have an account?",
    switchLabel: "Sign in instead"
  },
  forgot: {
    title: "Reset password",
    subtitle: "Enter your email and we will help you recover access.",
    primaryLabel: "Send Reset Link",
    helper: "Remembered your password?",
    switchLabel: "Back to sign in"
  }
};

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: true
};

function Login() {
  const navigate = useNavigate();
  const {
    login,
    register,
    requestPasswordReset,
    loginWithGoogleProfile,
    loading,
    isAuthenticated,
  } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentMode = useMemo(() => authModes[mode], [mode]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/books");
    }
  }, [isAuthenticated, navigate]);

  const setField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const resetStatus = () => {
    setMessage("");
    setError("");
  };

  const validateForm = () => {
    if (mode === "register" && form.name.trim().length < 3) {
      return "Please enter a full name with at least 3 characters";
    }

    if (!form.email.trim()) {
      return "Please enter your email address";
    }

    if (mode !== "forgot" && form.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (mode === "register" && form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetStatus();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (mode === "login") {
        const response = await login({
          email: form.email.trim().toLowerCase(),
          password: form.password,
          rememberMe: form.rememberMe,
        });

        setMessage(response.message);
        navigate("/books");
        return;
      }

      if (mode === "register") {
        const response = await register({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          rememberMe: form.rememberMe,
        });

        setMessage(response.message);
        navigate("/books");
        return;
      }

      const response = await requestPasswordReset(form.email.trim().toLowerCase());
      setMessage(response.message);
      setMode("login");
      setForm((currentForm) => ({
        ...currentForm,
        password: "",
        confirmPassword: "",
      }));
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(requestError.response?.data?.message || "Something went wrong. Please try again.");
        return;
      }

      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    resetStatus();

    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const response = loginWithGoogleProfile({
        name: googleUser.displayName || "Google User",
        email: googleUser.email || "",
        photoURL: googleUser.photoURL || "",
        rememberMe: form.rememberMe,
      });

      setMessage(response.message);
      navigate("/books");
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-visual">
          <div className="login-visual-overlay" />
          <div className="login-brand">
            <BookStoreLogo />
          </div>

          <div className="login-visual-copy">
            <p className="login-kicker">A classic reading destination</p>
            <h1>Thoughtful books, elegant browsing, and a calmer way to shop.</h1>
            <p>
              Build your reading list, save your favorite titles, and keep your
              bookstore experience in one place.
            </p>
          </div>

          <div className="login-feature-grid">
            <div className="login-feature-card">
              <span className="login-feature-label">Curated</span>
              <strong>Modern classics and useful reads</strong>
            </div>
            <div className="login-feature-card">
              <span className="login-feature-label">Secure</span>
              <strong>Sign in, register, and stay remembered across visits</strong>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-mode-switch">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                resetStatus();
                setMode("login");
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                resetStatus();
                setMode("register");
              }}
            >
              Register
            </button>
          </div>

          <div className="login-header">
            <h2>{currentMode.title}</h2>
            <p>{currentMode.subtitle}</p>
          </div>

          <div className="login-trust-row">
            <div className="login-trust-pill">
              <span className="login-trust-dot" />
              Private account space
            </div>
            <div className="login-trust-pill">
              <span className="login-trust-dot" />
              Fast checkout access
            </div>
          </div>

          {(message || error) && (
            <div className={error ? "auth-status auth-status-error" : "auth-status auth-status-success"}>
              {error || message}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
            />

            {mode !== "forgot" && (
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(event) => setField("password", event.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            )}

            {mode === "register" && (
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(event) => setField("confirmPassword", event.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            )}

            {mode !== "forgot" && (
              <p className="login-input-note">
                Use at least 8 characters for a stronger account password.
              </p>
            )}

            {mode !== "forgot" && (
              <div className="login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(event) => setField("rememberMe", event.target.checked)}
                  />
                  Remember me
                </label>

                {mode === "login" && (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      resetStatus();
                      setMode("forgot");
                    }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
            )}

            <button type="submit" className="primary-auth-btn" disabled={loading}>
              {loading ? "Please wait..." : currentMode.primaryLabel}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button
            className="secondary-auth-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Sign in with Google
          </button>

          <div className="login-assurance">
            <div>
              <strong>Reader-first access</strong>
              <span>Save your shelf, revisit favorites, and continue where you left off.</span>
            </div>
            <div>
              <strong>Secure sign-in</strong>
              <span>Your account state stays available on this device when remember-me is enabled.</span>
            </div>
          </div>

          <p className="auth-footer-copy">
            {currentMode.helper}{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                resetStatus();
                if (mode === "login") {
                  setMode("register");
                } else {
                  setMode("login");
                }
              }}
            >
              {currentMode.switchLabel}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
