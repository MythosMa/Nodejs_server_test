class Player {
  playerInfo = null;
  connection = null;
  table = null;
  constructor(playerInfo, connection) {
    this.playerInfo = playerInfo;
    this.connection = connection;
  }

  setTable(table) {
    this.table = table;
  }
}

module.exports = Player;
