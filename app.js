const express = require("express")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swagger = require('./swagger');
require('dotenv').config();
const app = express()
swagger(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/applicant', require('./routes/applicants.js'));


var port = process.env.PORT
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})