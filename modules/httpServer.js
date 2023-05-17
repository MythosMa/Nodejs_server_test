const http = require("http");

module.exports = createServer = (port, callback) => {
  let server = http
    .createServer((request, response) => {
      response.setHeader("Access-Control-Allow-Origin", "*"); //跨域
      response.setHeader("content-type", "application/json;charset=utf-8");
      if (callback) {
        callback(request, response);
      }
    })
    .listen(port);

  return server;
};
