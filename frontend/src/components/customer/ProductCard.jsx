import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const { name, transformedName } = product;
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState('/default.jpeg');

  const handleClick = () => {
    navigate(`/product/${name}`);
  };

  useEffect(() => {
    if (transformedName) {
      const checkImagePath = async () => {
        const jpgPath = `/${transformedName}.jpg`;
        const jpegPath = `/${transformedName}.jpeg`;

        const imageExists = (path) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        };

        if (await imageExists(jpgPath)) {
          setImagePath(jpgPath);
        } else if (await imageExists(jpegPath)) {
          setImagePath(jpegPath);
        } else {
          setImagePath('/default.jpeg');
        }
      };

      checkImagePath();
    }
  }, [transformedName]);

  return (
    <div 
      onClick={handleClick} 
      className="border border-gray-300 rounded-lg p-4 shadow-lg w-64 cursor-pointer"
    >
      <img 
        src={imagePath} 
        alt={name} 
        className="w-full h-32 object-cover rounded-lg mb-4" 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/default.jpeg';
        }}
      />
      <h3 className="text-lg font-semibold text-center">{name}</h3>
    </div>
  );
};

export default ProductCard;
