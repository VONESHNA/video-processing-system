import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 left-30 w-full">
      <div className="flex flex-col items-center ml-8"> {/* Increased margin-left here */}
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
