import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../features/products/user/userSlice";
import { removeErrors,removeSuccess} from "../features/products/productSlice";
import { useEffect } from "react";

const Register = () => {
   const [preview,setPreview] = useState("https://ui-avatars.com/api/?name=User&background=random");
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [avatar, setAvatar] = useState("")
   const { name, email, password } = user;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {success,error,loading} =useSelector((state) =>state.user);


   const handleChange = (e) => {
      if(e.target.name=="avatar"){
         const reader = new FileReader();
         reader.onload=() => {
            if(reader.resdyState === 2){
               setPreview(reader.result);
               setAvatar(reader.result);
            }
         };
        reader.readAsDataURL(e.target.files[0]);

      } else{
         setUser({ ...user, [e.target.name]: e.target.value });
   } 
};

const registerNow = (e) => {
   e.preventDefault();
   if(!name || !email || !password){
      TableRowsSplit.error("Please fill out all required fields",{
         position: "top-center",autoClose: 3000});
         return;
   }

   const myForm = new FormData();
   myForm.set("name",name);
   myForm.set("email",email);
   myForm.set("password",password);
   myForm.set("avatar",avatar);
   // console.log(myForm.entries());

   // for(let pair of myForm.entries()){
   //    console.log(pair[0] + " : " + pair(1));
   // }
   useDispatch(register(myForm));
   
};
  useEffect(() =>{
    if (error) {
      toast.error(error,{ position:"top-center", autoClose:3000 });
      dispatch(removeErrors());
    }
  },[dispatch,error]);

  useEffect(() =>{
    if (success) {
      toast.success("Registration SuccessFul",{ position:"top-center",autoClose:3000});
      dispatch(removeSuccess());
      navigate("/login")
    }
  },[dispatch,success]);

   return(
       <div className="bg-gray-50 flex items-center
       justify-center min-h-screen">
         <div className="w-full max-w-md p-8 bg-white
         rounded-2xl shadow-xl">
            <form enctype="multipart/form-data" className="space-y-6">
               <div className="tect-center">
                  <h2 className="text-3xl font-bold text-gray-8000">Create Account</h2>
                  <p className="text-sm text-gary-500 mt-2">Join us and start your journey</p>
               </div>
               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-1
                  block">Username</label>
                  <input
                   type="text" 
                   placeholder="johndoe"
                   value={name}
                   onChange={handleChange}
                   name="name"
                   className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent outline-none transition-all"/>
               </div>
               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-0
                  block">Email</label>
                  <input 
                   type="email" 
                   value={email}
                   onChange={handleChange}
                   name="email"
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
                  name="password"
                  placeholder="............"
                  value={password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent outline-none transition-all"/>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                     <img id="preview"src={preview} alt="" className="h-12 w-12
                     objext-cover rounded-sm bg-gray-100"/>
                  </div>
                  <label className="block">
                     <span className="sr-only">Choose Profile Image</span>
                     <input
                      type="file"
                       name="avatar" 
                       accept="image/*"
                        onChange={handleChange}
                       className="block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-full
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100"
                        />
                  </label>
               </div>
               <button className="w-full bh-indigo-600 hover:bg-indigo-700
               text-white font-semibold py-3 rounded-xl shadow-lg
               shadow-indigo-200 transition-all active:scale-[0.98]">{loading ? "Please wait": "Sign Up"}
               </button>

               <p className="text-center text-sm text-gray-600">
                  Already have an account? <Link className="text-indigo-600
                  font-semibold hover:underline">Sign in Here</Link>
                  </p>
            </form>
         </div>

       </div>
   );
};

export default Register;
