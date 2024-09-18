import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  
  // Extract payment details from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('status'); // Adjust if PhonePe sends a different query parameter

  return (
    <div>
      <h2>Payment {paymentStatus === 'success' ? 'Successful' : 'Failed'}</h2>
      {paymentStatus === 'success' && <p>Thank you for your purchase!</p>}
    </div>
  );
};

export default PaymentSuccess;
