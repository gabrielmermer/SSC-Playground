const express = require('express')
const app = express()
const port = 3000

const path = require('path');

// JSON parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// CORS - don't really know why but it's for 
// lowering the security to allow for file uploads

const cors = require('cors');
app.use(cors());

// this is more file uploading 
const fileUpload = require('express-fileupload');
app.use(fileUpload({
	createParentPath: true
}));

// cookies processing
const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(express.static('public'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
