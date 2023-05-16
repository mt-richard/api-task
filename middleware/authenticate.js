const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

 function authenticate(req, res, next) {
   const token = req.cookies.token;
 //   const token = req.headers['authorization'];
   if (!token) {
     res.json({ status: 401, message: 'Authorization header missing' });
   }
   jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
       res.json({ status: 401, message: 'Token is not valid' });
     }
     req.user = decoded.user;
     next();
   });
 }

 module.exports = { authenticate};