const websocketServer = require("./server/websocket");
const httpServer = require("./server/http");
const ws = websocketServer(11000);
const http = httpServer(12000);
