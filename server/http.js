const url = require("url");
const querystring = require("querystring");
const createServer = require("../modules/httpServer");

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

const httpServerCallback = (request, response) => {
  switch (request.method) {
    case "GET":
      toGet(request, response);
      break;
    case "POST":
      toPost(request, response);
      break;
    default:
      response.statusCode = 500;
      response.end();
      break;
  }
};

module.exports = httpServer = (port) => {
  const server = createServer(port, httpServerCallback);
};
