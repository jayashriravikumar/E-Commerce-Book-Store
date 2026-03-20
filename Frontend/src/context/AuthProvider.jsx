import { useState } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";

const AUTH_STORAGE_KEY = "bookstore-auth-user";
const AUTH_SESSION_KEY = "bookstore-auth-session-user";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/users`;

const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

function normalizeAuthPayload({ name, email, password }) {
  return {
    name: (name || "").trim(),
    email: (email || "").trim().toLowerCase(),
    password: password || "",
  };
}

function validateAuthResponse(data) {
  if (!data?.success || !data?.user) {
    throw new Error("Invalid authentication response");
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email, password, rememberMe }) => {
    setLoading(true);

    try {
      const payload = normalizeAuthPayload({ name, email, password });
      const { data } = await authApi.post("/register", payload);

      validateAuthResponse(data);

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
      const payload = normalizeAuthPayload({ email, password });
      const { data } = await authApi.post("/login", payload);

      validateAuthResponse(data);

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
      const { data } = await authApi.post("/forgot-password", {
        email: (email || "").trim().toLowerCase(),
      });
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
