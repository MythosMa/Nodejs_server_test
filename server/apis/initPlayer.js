const { getRequestBody } = require("../utils/utils");

const initPlayerGet = () => {};

const initPlayerPost = async (request, response, controller) => {
  let data = JSON.parse(await getRequestBody(request));
  controller.addPlayerToTable(data);
  return { message: "success", data: null };
};

module.exports = initPlayer = (request, response, controller) => {
  let responseData = {
    message: "success",
    data: null,
  };
  switch (request.method) {
    case "GET":
      responseData = { message: "get" };
      break;
    case "POST":
      responseData = initPlayerPost(request, response, controller);
      break;
  }
  response.write(JSON.stringify(responseData));
  response.end();
};
