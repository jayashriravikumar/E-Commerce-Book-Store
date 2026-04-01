import { BrowserRouter, Routes, Route } from 
'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import { Contact } from 'lucide-react';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
