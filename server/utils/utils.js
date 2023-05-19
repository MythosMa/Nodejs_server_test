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

module.exports = {
  getRequestBody,
  makeWebSocketResponseData,
};
