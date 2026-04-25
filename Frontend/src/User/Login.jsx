
import { useState } from "react";
import { Link } from "react-router-dom";

 
const Login = () => {
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")


  return (
    <div className="bg-gray-50 flex items-center
       justify-center min-h-screen">
         <div className="w-full max-w-md p-8 bg-white
         rounded-2xl shadow-xl">
            <form enctype="multipart/form-data" className="space-y-6">
               <div className="tect-center">
                  <h2 className="text-3xl font-bold text-gray-8000">Welcome Back</h2>
                  <p className="text-sm text-gary-500 mt-2">Please enter your details to sign in</p>
               </div>
      
               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-0
                  block">Email</label>
                  <input 
                   type="email" 
                   name="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="hello@example.com"
                  className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent outline-none transition-all"/>
               </div>
               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-1
                  block">Password</label>
                  <input 
                  type="password"
                  placeholder="............"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent outline-none transition-all"/>
               </div>


               <button className="w-full bh-indigo-600 hover:bg-indigo-700
               text-white font-semibold py-3 rounded-xl shadow-lg
               shadow-indigo-200 transition-all active:scale-[0.98]">Sign In </button>

               <p className="text-center text-sm text-gray-600">
                  Don't have an account? <Link className="text-indigo-600
                  font-semibold hover:underline">Sign up Here</Link>
                  </p>
            </form>
         </div>

       </div>
  )
}

export default Login
