import { useState } from "react";
import axios from "axios";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async ()=>{

    try{
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {email,password}
      );

      localStorage.setItem("token",res.data.token);

      alert("Login successful");

    }catch(err){
      alert("Login failed");
    }

  };

  return(

    <div className="login-page">

      <div className="login-wrapper">

        {/* LEFT SIDE */}

        <div className="login-left">

          <h1>WELCOME</h1>

          <p>
            Discover amazing books and improve your knowledge
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="login-right">

          <h2>Sign in</h2>

          <input
            type="email"
            placeholder="Email"
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
            Sign In
          </button>

          <div className="divider">
            OR
          </div>

          {/* SOCIAL LOGIN */}

          <button className="google-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="google"
            />
            Sign in with Google
          </button>

          <button className="github-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="github"
            />
            Sign in with GitHub
          </button>

          <p className="login-link">
            Don't have account? Register
          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;