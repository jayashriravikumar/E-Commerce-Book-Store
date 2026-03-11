import { useState } from "react";
import axios from "axios";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async ()=>{

    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      {email,password}
    );

    localStorage.setItem("token",res.data.token);

    alert("Login successful");
  };

  return(

    <div className="auth-container">

      {/* Left Side Branding */}

      <div className="auth-left">

        <h1>📚 BookStore</h1>

        <p>
          Discover thousands of books and expand your knowledge.
        </p>

      </div>

      {/* Login Card */}

      <div className="auth-right">

        <div className="login-card">

          <h2>Login to your account</h2>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button onClick={login}>
            Login
          </button>

          <p className="auth-footer">
            Don't have an account? Register
          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;