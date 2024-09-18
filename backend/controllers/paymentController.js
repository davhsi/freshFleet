const axios = require('axios');
const crypto = require('crypto');

const MAX_RETRIES = 5; // Increased retry attempts
const RETRY_DELAY = 10000; // Increased delay between retries

const initiatePayment = async (req, res) => {
    const { amount, merchantTransactionId, merchantUserId, mobileNumber } = req.body;
  
    const merchantId = "PGTESTPAYUAT";
    const redirectUrl = "http://localhost:5173/payment-success";
    const callbackUrl = "http://localhost:5000/payment-callback";
    const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const saltIndex = 1;
  
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount,
      redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl,
      mobileNumber,
      paymentInstrument: { type: "PAY_PAGE" }
    };
  
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const hashString = `${base64Payload}/pg/v1/pay${saltKey}`;
    const xVerify = crypto.createHash('sha256').update(hashString).digest('hex') + '###' + saltIndex;
  
    console.log('Request payload:', payload);
    console.log('X-VERIFY header:', xVerify);
  
    try {
      const response = await axios.post(
        'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        { request: base64Payload },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify,
          }
        }
      );
  
      console.log('API response:', response.data);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error initiating payment:', error.response ? error.response.data : error.message);
      return res.status(500).json({ error: error.message });
    }
  };
  

const paymentCallback = (req, res) => {
  const { success, code, message } = req.body;

  console.log('Payment callback received:', { success, code, message });

  if (success && code === 'PAYMENT_INITIATED') {
    res.status(200).send('Payment Successful');
  } else {
    res.status(400).send(`Payment Failed: ${message}`);
  }
};

module.exports = {
  initiatePayment,
  paymentCallback,
};
