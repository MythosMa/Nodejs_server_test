const { WebsocketCommand } = require("../server/types");
const { makeWebSocketResponseData } = require("../server/utils/utils");

class Table {
  maxPlayers = 8;
  constructor() {
    this.isGameStart = false;
    this.playersInTable = [];
  }

  addPlayerToTable(player) {
    this.playersInTable.push(player);
    console.log("addPlayerToTable=======");
    console.log(this.playersInTable);
    console.log("addPlayerToTable=======");
    this.wsSendPlayersInTable();
  }

  removePlayerFromTable(playerToRemove) {
    this.playersInTable = this.playersInTable.filter((player) => {
      return player.playerInfo.id !== playerToRemove.playerInfo.id;
    });
    console.log("removePlayerFromTable=======");
    console.log(this.playersInTable);
    console.log("removePlayerFromTable=======");
    this.wsSendPlayersInTable();
  }

  checkIsGameStart() {
    return this.isGameStart;
  }

  wsSendPlayersInTable() {
    this.playersInTable.forEach((player) => {
      if (player.connection) {
        player.connection.sendText(
          makeWebSocketResponseData(
            WebsocketCommand.RefreshPlayerSeatInGame,
            this.playersInTable.map((player) => player.playerInfo)
          )
        );
      }
    });
  }
}

module.exports = Table;
