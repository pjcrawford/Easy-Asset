
const express = require("express");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const mainRoutes = require('./routes/main');
const axios = require("axios");
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
require("dotenv").config();


// DB Setup
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up cors to allow us to accept requests from our client
app.use(cors())
app.use('/stocks', mainRoutes);
router(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
server.listen(port);

console.log("Server listening on:", port);

io.on('connection', function(socket) {
  console.log('New client connected with id:' + socket.id);
  
  //using socket.id as the login token
	io.on('stockChange', function(method, data) {
    this.io.emit('stock change',method, data);
		});
  });
  io.on('disconnect', function() {
		console.log('Client disconnected');
	});


module.exports = server;