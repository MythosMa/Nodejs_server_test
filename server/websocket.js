const createServer = require("../modules/websocketServer");
const { WebsocketCommand } = require("./types");

let server = null;
let coreController = null;

const openCallback = (connection) => {
  console.log("socket openCallback=======");
};

const textCallback = (result, connection) => {
  switch (result.command) {
    case WebsocketCommand.AddPlayer:
      coreController.addPlayer(result.playerInfo, connection);
      break;
  }
};

const binaryCallback = (result, connection) => {
  console.log("socket binaryCallback=======");
};
const closeCallback = (result, connection) => {
  console.log("socket closeCallback=======");
  if (connection.player) {
    coreController.removePlayer(connection.player);
  }
};
const errorCallback = (result, connection) => {
  console.log("socket errorCallback=======");
};

module.exports = websocketServer = (port, controller) => {
  coreController = controller;
  server = createServer(port, {
    openCallback,
    textCallback,
    binaryCallback,
    closeCallback,
    errorCallback,
  });

  return server;
};
