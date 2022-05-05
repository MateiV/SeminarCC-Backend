// index.js
const express = require("express");
const messagesRouter = require("./routers/messagesRouter"); //look here
const bodyParser = require("body-parser");

const app = express();
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/messages', messagesRouter); //and look here too

const port = 8080;
app.listen(port, () => {
  console.log(`Cloud computing app listening on port ${port}!`);
});