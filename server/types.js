const WebsocketCommand = {
  AddPlayer: "add-player",
  RefreshPlayerSeatInGame: "refresh-player-seat-in-game",
  WaitingGameStart: "waiting-game-start",
  GameStart: "game-start",
  GamePrepare: "game-prepare",
  RoundStart: "round-start",
  DistributeCharactor: "distribute-charactor",
  DispatchChamber: "dispatch-chamber",
  Plan: "plan",
  StrategicDeployment: "strategic-deployment",
  ChangeSituation: "change-situation",
  DecisiveMoment: "decisve-moment",
  SettleMent: "settlement",
  RoundEnd: "round-end",
  GameEnd: "game-end",
};

const ApiUrl = {
  GetTableInfo: "/get-table-info",
  InitPlayer: "/init-player",
};

module.exports = {
  WebsocketCommand,
  ApiUrl,
};
