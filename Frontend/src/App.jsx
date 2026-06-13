import { BrowserRouter, Routes, Route } from 
'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Products from './pages/Products';
import Register from './User/Register';
import Login from './User/Login';
import Profile from './User/Profile';
import UpdateProfile from './User/UpdateProfile';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/profile/update" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
