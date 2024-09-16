
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { name, image } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    // URL encode the product name to handle special characters and spaces
    const encodedName = encodeURIComponent(name);
    navigate(`/product/${encodedName}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="border border-gray-300 rounded-lg p-4 shadow-lg w-64 cursor-pointer transition-transform transform hover:scale-105"
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-32 object-cover rounded-lg mb-4" 
      />
      <h3 className="text-lg font-semibold text-center">{name}</h3>
    </div>
  );
};

// Define prop types for the component
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;