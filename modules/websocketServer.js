const WS = require("nodejs-websocket");

module.exports = createServer = (port, callbacks) => {
  let server = WS.createServer((connection) => {
    connection.on("text", (result) => {
      console.log("connecton on text========");
      console.log(result);
      console.log("connecton on text========");
    });
    connection.on("error", (result) => {
      console.log("connecton on error========");
      console.log(result);
      console.log("connecton on error========");
    });
  }).listen(port);

  return server;
};
