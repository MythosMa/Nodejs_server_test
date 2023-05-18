const WS = require("nodejs-websocket");

module.exports = createServer = (port, callbacks) => {
  let server = WS.createServer((connection) => {
    if (callbacks.connectCallback) {
      callbacks.connectCallback(server, null, connection);
    }
    //客户端向服务器发送字符串时的监听函数
    connection.on("text", (result) => {
      // console.log("connection.on -> text", result);
    });
    //客户端向服务器发送二进制时的监听函数
    connection.on("binary", (result) => {
      // console.log("connection.on -> binary", result);
    });
    //客户端连接到服务器时的监听函数
    connection.on("connection", (result) => {
      // console.log("connection.on -> connect", result);
    });
    //客户端断开与服务器连接时的监听函数
    connection.on("close", (result) => {
      // console.log("connection.on -> close", result);
      if (callbacks.closeConnectCallback) {
        callbacks.closeConnectCallback(server, JSON.parse(result), connection);
      }
    });
    //客户端与服务器连接异常时的监听函数
    connection.on("error", (result) => {
      // console.log("connection.on -> error", result);
    });
  }).listen(port);

  return server;
};
