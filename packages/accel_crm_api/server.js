let express = require("express");
let database = require("./helper/database");
let config = require("./config.json");
var bodyParser = require("body-parser");
let cors = require("cors");
var fileupload = require("express-fileupload");
var path = require("path");
var fs = require("fs");

if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync('./public/uploads', { recursive: true })
}

if (!fs.existsSync('./public/invoices')) {
  fs.mkdirSync('./public/invoices', { recursive: true })
}

if (!fs.existsSync('./public/salarySlips')) {
  fs.mkdirSync('./public/salarySlips', { recursive: true })
}

database.initModels();
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
enableStaticFileServer(app, config.uploadUrl, '/static');
enableStaticFileServer(app, 'public/invoices', '/invoice');


enableCORS(app);
app.use(cors());
app.use(bodyParser.json());
database.connect();

global.globalString = "This can be accessed anywhere!++++++++++++++";

function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });
}

function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}

require("./routes/index.routes")(app);
require("./schedulers/index.scheduler")(app);

app.listen(config.server.port, () => {
  console.log("App listening on port : ", config.server.port);
});
