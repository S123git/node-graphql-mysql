// /middleware/auth.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'b246203bef60d8600de537f75d3ef73691105ae141203929279c07aa36396685'; // Use the same secret key

const auth = (req, res, next) => {
  const token = req.headers.authorization || '';
  if (! token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  
  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token.');
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = auth;