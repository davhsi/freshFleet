import React, { useEffect, useState } from 'react';

const ToastNotification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Notification will disappear after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (!isVisible) {
      onClose();
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
