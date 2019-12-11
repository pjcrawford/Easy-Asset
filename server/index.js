
const express = require("express");
// const http = require("http");

const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
// const logger = require('morgan');
// const socketIO = require("socket.io")
const mainRoutes = require('./routes/main');
const axios = require("axios");
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const bodyParser = require("body-parser");
require("dotenv").config();
// const db = require('./server/models/db');

// const index = require('./server/routes/index');
// const stocks = require('./server/routes/main');


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

//array called clients
//everytime someone connects, check if they have connected before, if not save the client id and socket id which will keep it open.
let clients = [];
let ioSocket;

initSocket = server => {
  ioSocket = require("socket.io")(server);
  ioSocket.set("origins", "*:*");
  ioSocket.on("connection", function(socket) {
      var clientInfo = clients.find(client => client.clientId === socket.id);
      if (!clientInfo) {
        var clientInfo = new Object();
        clientInfo.clientId = socket.id;
        clientInfo.socket = socket;
        clients.push(clientInfo);
      }
    //loop through list of clients 
    socket.on("disconnect", function(data) {
      for (var i = 0, len = clients.length; i < len; ++i) {
        var c = clients[i];
        if (c.clientId == socket.id) {
          clients.splice(i, 1);
          break;
        }
      }
    });
    socket.emit('stock-update', 'it worked');
  });
};
initSocket(server);
// Server Setup
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
server.listen(port);

console.log("Server listening on:", port);

// io.on('connection', function(socket) {
//   console.log('New client connected with id:' + socket.id);
  

// io.on('stockChange', function(method, data) {
//     this.io.emit('stock change',method, data);
// 		console.log(`stock changed!`);});;
//   });
//   io.on('disconnect', function() {
// 		console.log('Client disconnected');
//   });





module.exports = server;