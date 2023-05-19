const websocketServer = require("./server/websocket");
const httpServer = require("./server/http");
const CoreController = require("./Game/CoreController");

let coreController = new CoreController();

const ws = websocketServer(11000, coreController);
const http = httpServer(12000, coreController);
