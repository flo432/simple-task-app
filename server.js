const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const cors = require('cors');
const index = require('./routes/index');
const tasks = require('./routes/tasks');

const app = express();

const port = process.env.PORT || 8080;

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function () {
  console.log("server started on port " + port);
});
