const WebsocketCommand = {
  AddPlayer: "add-player",
  RefreshPlayerSeatInGame: "refresh-player-seat-in-game",
};

const ApiUrl = {
  GetTableInfo: "/get-table-info",
  InitPlayer: "/init-player",
};

module.exports = {
  WebsocketCommand,
  ApiUrl,
};
