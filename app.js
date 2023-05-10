const express = require("express")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {users} = require('./models/index.js');
const { json } = require("sequelize");
const swagger = require('./swagger');
const app = express()
swagger(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', require('./routes/users.js'));
app.use('/applicant', require('./routes/applicants.js'));

//First page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/create', function(req, res) {
  res.sendFile(__dirname + '/views/signup.html')
});
app.get('/apply', function(req, res) {
  res.sendFile(__dirname + '/views/application.html')
});

//logout 
app.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');
  });

var port = 5500
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})