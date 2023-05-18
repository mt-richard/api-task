const express = require("express")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swagger = require('./swagger');
const cors = require('cors')
require('dotenv').config();
const app = express()
swagger(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/applicant', require('./routes/applicants.js'));
app.use(express.static('views'));

var port = process.env.PORT
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})