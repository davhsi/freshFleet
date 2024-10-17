import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">FreshFleet</h3>
          <p className="text-sm">
            FreshFleet is your go-to solution for fresh product delivery and vendor management. We ensure quality products and efficient service for both customers and vendors.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link>
            </li>
            <li className="mb-2">
              <Link to="/refund-policy" className="hover:underline">Refund Policy</Link>
            </li>
            <li className="mb-2">
              <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
            {/* <li className="mb-2">
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </li> */}
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
          <p className="text-sm mb-2">
            <span className="font-semibold">Email:</span> <a href="mailto:shop.freshfleet@gmail.com" className="hover:underline">shop.freshfleet@gmail.com</a>
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Phone:</span> <a href="tel:9489483316" className="hover:underline">9489483316</a>
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            {/* Social Media Icons (use icons or placeholders) */}
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i> {/* Placeholder for Facebook */}
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i> {/* Placeholder for Twitter */}
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i> {/* Placeholder for Instagram */}
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin"></i> {/* Placeholder for LinkedIn */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} FreshFleet. All rights reserved.</p>
        <p className="text-xs mt-2">
          Made with <span className="text-red-500">♥</span> by FreshFleet team. 
          {/* Cute message */}
          <span className="text-yellow-400"> Stay fresh, stay fleet!</span> 
          🍋🍃🍓
        </p>
      </div>
    </footer>
  );
};

export default Footer;
  