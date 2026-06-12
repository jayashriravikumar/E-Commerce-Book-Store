import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/products/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.user
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields", {
        position: "top-center",
      });
      return;
    }

    dispatch(
      login({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
    }

    if (success) {
      toast.success("Login Successful", {
        position: "top-center",
      });

      navigate("/");
    }
  }, [success, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;