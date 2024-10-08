// testEnv.js
require('dotenv').config(); // Load environment variables

// Log environment variables
console.log('--- Environment Variables ---');
console.log('Email:', process.env.EMAIL || 'Not defined');
console.log('Email Password:', process.env.EMAIL_PASSWORD || 'Not defined');
console.log('Client URL:', process.env.CLIENT_URL || 'Not defined');
console.log('Mongo URI:', process.env.MONGO_URI || 'Not defined');
console.log('Port:', process.env.PORT || 5000);
