const express = require("express")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {users} = require('./models/index.js');
const { json } = require("sequelize");
const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




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





//First page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

//Login 
app.post('/login', async (req, res) =>{
    const { email, password } = req.body
    const userlog = await users.findOne({ where: {email, password}})
  
    // res.json(userlog)
    if (userlog) {
        const token = jwt.sign({ user: { email } }, secretKey, {expiresIn: '5m'});
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect(301, '/dashboard');
       
        // res.json(token)
    } else {
        res.status(201).json({message:'Invalid email or Password'})
    }
});

//signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const insert = await users.create({ name, email, password });
      if (insert) {
        res.json({ message: 'User created successfully!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  


//logout 
app.get('/logout', (req, res) => {
   
    res.cookie('token', '', { expires: new Date(0) });
    const message ='Logout successfull';
    res.redirect('/',401,{message});
  });
  


//dashboard
app.get('/dashboard', authenticate, (req, res)=>{
    res.status(200).sendFile(__dirname + '/views/dashboard.html')
})
app.get('/users', authenticate, async(req, res) =>{
    const allusers = await users.findAll()
    res.json(allusers);
})

var port = 5500
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})