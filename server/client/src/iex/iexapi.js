import io from "socket.io-client";
const socket = io("http://localhost:5000/", {reconnection: false});

function connectAsPlayer(playerId, cb, gameStateCallback) {
  if (socket.callbacks["$clock_tick"] === undefined) {
    //console.log("attempt clock tick");
    socket.on("clock_tick", message => {
      cb(message);
    });
  }

  if (socket._callbacks["$game_state"] === undefined) {
    //console.log("attempt clock tick");
    socket.on("game_state", message => {
      gameStateCallback(message);
    });
  }

  socket.emit("storeClientInfo", {
    customId: "Player" + playerId,
    playerId
  });

  socket.emit("request_game_state", { playerId });
}

function connectAsStaff(staffCode, cb, roundStateCallback, gameStateCallback) {
  if (socket._callbacks["$clock_tick"] === undefined) {
    //console.log("attempt clock tick");
    socket.on("clock_tick", message => {
      cb(message);
    });
  }

  if (socket._callbacks["$full_round_state"] === undefined) {
    //console.log("attempt clock tick");
    socket.on("full_round_state", message => {
      roundStateCallback(message);
    });
  }
  if (socket._callbacks["$game_state"] === undefined) {
    //console.log("attempt clock tick");
    socket.on("game_state", message => {
      gameStateCallback(message);
    });
  }

  socket.emit("storeClientInfo", {
    customId: "Staff"
  });

  socket.emit("request_full_game_state", { staffCode });
}


function sendClientInfo(tournamentId) {
  socket.emit("storeClientInfo", { customId: "manager", tournamentId });
}

function sendGameUpdate(update) {
  socket.emit("update_game_state", update);
}

function startClock(clockName) {
  if (socket) {
    socket.emit("setClockState", { option: "start", clockName });
  }
}

function stopClock(clockName) {
  if (socket) {
    socket.emit("setClockState", { option: "stop", clockName });
  }
}

function resetClock(clockName) {
  if (socket) {
    socket.emit("setClockState", {
      option: "set",
      clockName,
      value: 30 * 60 * 1000
    });
  }
}

function modifyClock(mod, clockName) {
  if (socket) {
    socket.emit("setClockState", {
      option: "modify",
      clockName,
      value: mod
    });
  }
}

export {
  connectAsPlayer,
  connectAsManager,
  startClock,
  stopClock,
  sendClientInfo,
  resetClock,
  modifyClock,
  sendGameUpdate,
  connectAsStaff
};