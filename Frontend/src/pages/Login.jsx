import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaFacebook
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      localStorage.setItem("token",res.data.token);

      alert("Login successful");

    } catch(err) {

      alert("Login failed");

    }

  };

  return (

    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="login-left">

          <h1 className="logo">📚 BookStore</h1>

          <h2>Welcome Back</h2>

          <p>
            Discover thousands of books and expand your knowledge.
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="login-right">

          <h2>Sign in</h2>


          {/* EMAIL */}

          <div className="input-box">

            <FaUser className="input-icon"/>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>


          {/* PASSWORD */}

          <div className="input-box">

            <FaLock className="input-icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>


          {/* OPTIONS */}

          <div className="login-options">

            <label>
              <input type="checkbox"/>
              Remember me
            </label>

            <a href="#">Forgot Password?</a>

          </div>


          {/* LOGIN BUTTON */}

          <button
            className="login-btn"
            onClick={login}
          >
            Sign in
          </button>


          <div className="divider">
            OR
          </div>


          {/* SOCIAL LOGIN */}

          <div className="social-login">

            <button className="google">
              <FcGoogle/> Google
            </button>

            <button className="github">
              <FaGithub/> GitHub
            </button>

            <button className="facebook">
              <FaFacebook/> Facebook
            </button>

          </div>


          {/* REGISTER */}

          <p className="register-text">

            Don't have an account?

            <span> Register</span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;