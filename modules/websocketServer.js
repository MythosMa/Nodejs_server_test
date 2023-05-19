const WS = require("nodejs-websocket");

module.exports = createServer = (port, callbacks) => {
  let server = WS.createServer((connection) => {
    if (callbacks.openCallback) {
      callbacks.openCallback(connection);
    }
    //客户端向服务器发送字符串时的监听函数
    connection.on("text", (result) => {
      // console.log("connection.on -> text", result);
      if (!result || result === "heart test") {
        return;
      }
      if (callbacks.textCallback) {
        callbacks.textCallback(JSON.parse(result), connection);
      }
    });
    //客户端向服务器发送二进制时的监听函数
    connection.on("binary", (result) => {
      // console.log("connection.on -> binary", result);
      if (callbacks.binaryCallback) {
        callbacks.binaryCallback(result, connection);
      }
    });
    //客户端断开与服务器连接时的监听函数
    connection.on("close", (result) => {
      // console.log("connection.on -> close", result);
      if (callbacks.closeCallback) {
        callbacks.closeCallback(result, connection);
      }
    });
    //客户端与服务器连接异常时的监听函数
    connection.on("error", (result) => {
      // console.log("connection.on -> error", result);
      if (callbacks.errorCallback) {
        callbacks.errorCallback(result, connection);
      }
    });
  }).listen(port);

  return server;
};
