import { useNavigate } from 'react-router-dom';

const UserRoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/userHome.jpeg')` }}
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
