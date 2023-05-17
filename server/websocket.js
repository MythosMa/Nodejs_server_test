const createServer = require("../modules/websocketServer");

module.exports = websocketServer = (port) => {
  const server = createServer(port, {});
};
