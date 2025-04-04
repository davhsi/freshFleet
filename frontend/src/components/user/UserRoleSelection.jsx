import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CDN_BASE_URL } from '../../config';


const UserRoleSelection = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState('products/userHome.jpeg');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust this value for mobile breakpoint
        setBackgroundImage('products/2.jpg');
      } else {
        setBackgroundImage('products/userHome.jpeg');
      }
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRoleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${CDN_BASE_URL}/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
          >
      <div className="absolute top-[55%] left-[75%] transform -translate-x-[40%] -translate-y-1/2">
        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => handleRoleSelect('customer')} 
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Customer
          </button>
          <button 
            onClick={() => handleRoleSelect('vendor')} 
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 hover:bg-green-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500"
          >
            Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRoleSelection;
