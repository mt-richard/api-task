const express = require("express")
const {users} = require('../models/index');
const jwt = require('jsonwebtoken');
const route = express.Router()
require('dotenv').config();

 const secretKey = process.env.JWT_SECRET;
 function authenticate(req, res, next) {
   const token = req.cookies.token;
 //   const token = req.headers['authorization'];
 
   if (!token) {
     return res.json({status:401, message: 'Authorization header missing' });
   }
   jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
       return res.json({ status:401,message: 'Token is not valid' });
     }
     req.user = decoded.user;
     next();
   });
 }

route.get('/', authenticate, async(req, res) =>{
  try {
   
    const allusers = await users.findAll()
    res.json({allusers, user: req.user});
  } catch (error) {
    console.error(error)
  }
    
})

route.get('/islogged', authenticate, async(req, res) =>{
  try {
    const allusers = await users.findAll()
    res.json({ user: req.user});
  } catch (error) {
    console.error(error)
  }
    
})

route.post('/signup', async (req, res) => {
        
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const exist = await users.findOne({ where: {email: email}});
        if (exist){
          res.json({ status: 201, message: 'Email Already Exisit' });

        }else{
            const insert = await users.create({ name, email, password });
            if (insert) {
              res.json({ status: 200, message: 'User created successfully! Back to Login' });
            }
        }
    } catch (error) {
    //   console.log(error);
      res.json({ status: 500, message: 'Error creating user' });
    }
  });

route.post('/login', async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const userlog = await users.findOne({ where: {email, password}})
  
    if (userlog) {
        const token = jwt.sign({ user: { id:userlog.id, name:userlog.name } }, secretKey, {expiresIn: '5m'});
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.json({status: 200, message: 'ok', token: token});
       
    } else {
        res.json({status: 400, message:'Invalid email or Password'})
    }
});

route.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const user = await users.findByPk(req.params.id);
    if (user) {
      user.destroy();
      res.json({status: 200, message: 'Delete successful'})
    }else {
      res.json({status: 404, message: 'Not found'})
    }
  } catch (error) {
    console.error(error);
  }
})

route.patch('/update/:id', authenticate, async (req, res) =>{
  try {
    const userlog = req.user.id
    const isThere = await users.findByPk(userlog);
    if (isThere) {
        isThere.update(req.body);
        res.json({status: 200, message: 'Data Updated Successfully'})
    }else {
        res.json({status: 404, message:'User Not found'})
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = route