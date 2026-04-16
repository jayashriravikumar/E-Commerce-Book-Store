import { Mail, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaYoutube,FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return <footer className="bg-gray-900 text-gray-200 mt-8">
    {/* main container */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6
    text-center md:text-left py-5">
      {/* Section 1: Contact */} 
      <div className="flex-1 min-w-62.5">
        <h3 className="text-xl font-semibold *:mb-4 text-white">Contact Us</h3>
        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400
        mb-2">
          <Phone size={16}/>
          Phone : +91 9043017689
          </p>
        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400
        mb-2">
          <Mail size={16}/>
          Email :bookstoreofficial@gmail.com
          </p>
      </div>
      {/* Section 2: Social */}
      <div className="flex-1 min-w-62.5 items-center gap-4">
        <h3 className="text-xl font-semibold mb-4 text-white">Follow Me</h3>
      </div>
      <div className="flex gap-4 items-center justify-center md:justify-start">
        <a href="#" target="_blank">
          <FaGithub className="w-7 h-7 text-gray-400 transition-transform duration-300
          hover:scale-110 hover:text-blue-500"/>
        </a>
         <a href="#" target="_blank">
          <FaLinkedin className="w-7 h-7 text-gray-400 transition-transform duration-300
          hover:scale-110 hover:text-blue-500"/>
        </a>
         <a href="#" target="_blank">
          <FaYoutube className="w-7 h-7 text-gray-400 transition-transform duration-300
          hover:scale-110 hover:text-blue-500"/>
        </a>
         <a href="#" target="_blank">
          <FaInstagram className="w-7 h-7 text-gray-400 transition-transform duration-300
          hover:scale-110 hover:text-blue-500"/>
        </a>
      </div>
      {/* Section 3: About */}
      <div className="flex-1 min-w-62.5">
        <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
        <p className="text-gray-400 loading-relaxed">Providing professional e-commerce solutions to help
          you grow your online business.</p>
        
      </div>

    </div>
    {/* Bottom */}
    <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">@ 2026 
      Tutor joes. All rights reserved</div>
  </footer>;
};

export default Footer;



