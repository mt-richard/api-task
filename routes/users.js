const express = require("express")
const {users} = require('../models/index');
const jwt = require('jsonwebtoken');
const route = express.Router()

 const secretKey = 'mysecretkey';
 function authenticate(req, res, next) {
   const token = req.cookies.token;
 //   const token = req.headers['authorization'];
 
   if (!token) {
     return res.status(401).json({ message: 'Authorization header missing' });
   }
   jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
       return res.status(401).json({ message: 'Token is not valid' });
     }
     req.user = decoded.user;
     next();
   });
 }

route.get('/', authenticate, async(req, res) =>{
    const allusers = await users.findAll()
    res.json(allusers);
})

route.post('/signup', async (req, res) => {
    // const { name, email, password } = req.body;
        
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
      const insert = await users.create({ name, email, password });
      if (insert) {
        res.json({ message: 'User created successfully!' });
      }
    } catch (error) {
    //   console.log(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });

route.post('/login', async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const userlog = await users.findOne({ where: {email, password}})
  
    if (userlog) {
        const token = jwt.sign({ user: { email } }, secretKey, {expiresIn: '5s'});
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.json({message: 'ok', token: token});
       
    } else {
        res.status(201).json({message:'Invalid email or Password'})
    }
});

module.exports = route