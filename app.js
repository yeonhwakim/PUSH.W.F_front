const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const port = 80;

app.use(helmet());
app.use(compression());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./JS'));

app.get('/', (req, res) => res.render('index.html'));

app.listen(port,()=>{console.log(`SEMOHOME RUNNING ON ${port}`)});