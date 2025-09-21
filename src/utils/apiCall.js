const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000/api/users';

async function getUserById(userId) {
  try {
    const res = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching user:', err.message);
    return null; // if user-service is down or user not found
  }
}

module.exports = { getUserById };
