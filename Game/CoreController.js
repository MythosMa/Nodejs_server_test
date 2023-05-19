const Player = require("./PlayerController");
const Table = require("./TableController");

class CoreController {
  constructor() {
    this.tables = [];
    this.players = [];
  }

  addPlayer(playerInfo, connection) {
    let isFindPlayer = this.players.find((player) => {
      player.playerInfo.id === playerInfo.id;
    });
    if (!isFindPlayer) {
      let player = new Player(playerInfo, connection);
      connection["player"] = player;
      this.players.push(player);
      this.addPlayerToTable(player);
    } else if (isFindPlayer.tableId) {
      isFindPlayer.connection = playerInfo.connection;
    } else {
      // 待添加逻辑
    }
  }

  addPlayerToTable(player) {
    let table = null;
    if (this.tables.length) {
      table = this.tables[this.tables.length - 1];
    } else {
      table = new Table();
      this.tables.push(table);
    }
    player.setTable(table);
    table.addPlayerToTable(player);
  }

  checkTableStatus(playerInfo) {
    let table = null;
    if (this.tables.length) {
      table = this.tables[length - 1];
    }
  }

  removePlayer(playerToRemove) {
    playerToRemove.table.removePlayerFromTable(playerToRemove);
    this.players = this.players.filter((player) => {
      return player.playerInfo.id !== playerToRemove.playerInfo.id;
    });
  }
}

module.exports = CoreController;
