const getRequestBody = (request) => {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      resolve(body);
    });
    request.on("error", (error) => {
      reject(error);
    });
  });
};

const makeWebSocketResponseData = (command, data) => {
  console.log("makeWebSocketResponseData==================");
  console.log({ command, data });
  console.log("makeWebSocketResponseData==================");
  return JSON.stringify({ command, data });
};

// 洗牌-打乱数组中数据的顺序
const shuffledArray = (array) => {
  let shuffled = array.slice(0);
  let i = array.length;
  let temp = null;
  let index = 0;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
};

const getPlayerByRole = (players, role) => {
  let player = null;
  let playerTemp = players[0];
  do {
    if (playerTemp.gameInfo.role === role) {
      player = playerTemp;
    }
    playerTemp = playerTemp.gameInfo.nextPlayer;
  } while (!player);

  return player;
};

module.exports = {
  getRequestBody,
  makeWebSocketResponseData,
  shuffledArray,
  getPlayerByRole,
};
