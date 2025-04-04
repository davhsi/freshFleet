import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CDN_BASE_URL } from '../../config' // import as variable

const ProductCard = ({ product }) => {
  const { name, transformedName } = product;
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState(`${CDN_BASE_URL}/products/default.jpeg`);

  const handleClick = () => {
    navigate(`/product/${name}`);
  };

  useEffect(() => {
    if (transformedName) {
      const checkImagePath = async () => {
        const jpgPath = `${CDN_BASE_URL}/products/${transformedName}.jpg`;
        const jpegPath = `${CDN_BASE_URL}/products/${transformedName}.jpeg`;
        const fallbackPath = `${CDN_BASE_URL}/products/default.jpeg`;

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
          setImagePath(fallbackPath);
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
          e.target.src = `${CDN_BASE_URL}/products/default.jpeg`;
        }}
      />
      <h3 className="text-lg font-semibold text-center">{name}</h3>
    </div>
  );
};

export default ProductCard;
