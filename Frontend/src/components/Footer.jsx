import { Mail, Phone } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-6">

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Contact Us
          </h3>

          <p className="flex items-center gap-2 text-gray-400 mb-3">
            <Phone size={16} />
            Phone: +91 9043017689
          </p>

          <p className="flex items-center gap-2 text-gray-400 break-all">
            <Mail size={16} />
            Email: bookstoreofficial@gmail.com
          </p>
        </div>

        {/* Follow Me */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Follow Me
          </h3>

          <div className="flex gap-5">
            <a href="#" target="_blank" rel="noreferrer">
              <FaGithub className="w-7 h-7 text-gray-400 hover:text-blue-500 hover:scale-110 transition duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaLinkedin className="w-7 h-7 text-gray-400 hover:text-blue-500 hover:scale-110 transition duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaYoutube className="w-7 h-7 text-gray-400 hover:text-red-500 hover:scale-110 transition duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaInstagram className="w-7 h-7 text-gray-400 hover:text-pink-500 hover:scale-110 transition duration-300" />
            </a>
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            About
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Providing professional e-commerce solutions to help
            you grow your online business.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © 2026 BookStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;