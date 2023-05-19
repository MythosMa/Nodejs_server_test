const url = require("url");
const querystring = require("querystring");
const createServer = require("../modules/httpServer");
const { ApiUrl } = require("./types");
const initPlayer = require("./apis/initPlayer");

let coreController = null;

const toGet = (request, response) => {
  let requestObject = url.parse(request.url, true);
  let responseData = {
    message: "success",
    data: {
      pathname: requestObject.pathname,
      params: requestObject.query,
    },
  };
  response.write(JSON.stringify(responseData));
  response.end();
};
const toPost = (request, response) => {
  let postData = "";
  request.on("data", (chunk) => {
    postData += chunk;
  });
  request.on("end", () => {
    postData = querystring.parse(postData);
    let responseData = {
      message: "success",
      data: {
        params: postData,
      },
    };
    response.write(JSON.stringify(responseData));
    response.end();
  });
};

const getTableInfoGet = (request, response) => {};

const getTableInfo = (request, response) => {
  switch (request.method) {
    case "GET":
      getTableInfoGet(request, response);
      break;
    case "POST":
      break;
  }
};

const httpServerCallback = (request, response) => {
  const { url } = request;
  switch (url) {
    case ApiUrl.InitPlayer:
      initPlayer(request, response, coreController);
      break;
  }
};

module.exports = httpServer = (port, controller) => {
  const server = createServer(port, httpServerCallback);
  coreController = controller;
  return server;
};
