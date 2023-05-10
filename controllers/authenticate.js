const secretKey = 'mysecretkey';
function authenticate(req, res, next) {
  const token = req.cookies.token;
//   const token = req.headers['authorization'];

  if (!token) {
    res.redirect('/')
    // return res.status(401).json({ message: 'Authorization header missing' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
    //   return res.status(401).json({ message: 'Token is not valid' });
        res.redirect('/')
    }
    req.user = decoded.user;
    next();
  });
}