class Table {
  constructor() {
    this.isGameStart = false;
    this.players = [];
  }

  addPlayers(playerInfo) {
    this.players.push(playerInfo);
  }

  checkIsGameStart() {
    return this.isGameStart;
  }
}
