
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
//   }
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
const index = require('./routes/index');
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const bodyParser = require("body-parser");
require("dotenv").config();

// const LocalStrategy = require('passport-local').Strategy;



// DB Setup
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});

// app.get('/login', function (req, res) {
//   res.sendFile(__dirname + '/login.html');
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(passport.initialize());
app.use(cookieParser());

// set up cors to allow us to accept requests from our client
app.use(cors())
app.use('/stocks', mainRoutes);
app.use('/', index);
router(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
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
    console.log("client connected to:", socket.id);
    socket.on("storeClientInfo", function(data) {
      var clientInfo = clients.find(client => client.clientId === socket.id);
      if (!clientInfo) {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = socket.id;
        clientInfo.socket = socket;
        clientInfo.userID = data.userID;
        clients.push(clientInfo);
      } else {
        clientInfo.userID = data.userID;
      }
      console.log("client info from ", socket.id, ": ", data.customId);
      socket.on("setState", function(data) {
          ResetState(data);
        });
      
    });
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

// passport.use('login', new LocalStrategy ((username, password, done) => {
//   const authenticated = username === "John" && password === "Smith";

//   if (authenticated) {
//     return done(null, { myUser:'user', myID: 1234 });
//   } else {
//     return done(null, false);
//   }
// }));
// app.post('/login', passport.authenticate('login', {
//   successRedirect: '/success',
//   failureRedirect: '/login'
// }));

// app.get('/success', (req, res) => {
//   res.send("Hey, hello from the server!");
// })

// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '..', 'build','index.html'));
//   });



module.exports = server;