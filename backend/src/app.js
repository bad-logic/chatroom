



"use strict";


// EXPRESS REQUEST HANDLER SETUP


const {express,bodyParser,morgan,compression} = require('./modules');



const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(compression());

app.use(require("./routes"));



module.exports = app;