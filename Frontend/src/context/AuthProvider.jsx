import { useState } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";

const AUTH_STORAGE_KEY = "bookstore-auth-user";
const AUTH_SESSION_KEY = "bookstore-auth-session-user";
const API_URL = "http://localhost:5000/api/users";

function readStoredUser() {
  const localUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const sessionUser = sessionStorage.getItem(AUTH_SESSION_KEY);
  const rawUser = localUser || sessionUser;

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function persistUser(user, rememberMe) {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);

  const storage = rememberMe ? localStorage : sessionStorage;
  const key = rememberMe ? AUTH_STORAGE_KEY : AUTH_SESSION_KEY;
  storage.setItem(key, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email, password, rememberMe }) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      setUser(data.user);
      persistUser(data.user, rememberMe);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password, rememberMe }) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setUser(data.user);
      persistUser(data.user, rememberMe);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, { email });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleProfile = ({ name, email, photoURL, rememberMe }) => {
    const googleUser = {
      _id: `google-${email}`,
      name,
      email,
      role: "user",
      avatar: {
        public_id: "google_avatar",
        url: photoURL,
      },
    };

    setUser(googleUser);
    persistUser(googleUser, rememberMe);

    return {
      success: true,
      message: "Signed in with Google successfully",
      user: googleUser,
    };
  };

  const logout = () => {
    setUser(null);
    clearStoredUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        register,
        login,
        logout,
        requestPasswordReset,
        loginWithGoogleProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
