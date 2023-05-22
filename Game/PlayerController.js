class Player {
  playerInfo = null;
  gameInfo = null;
  connection = null;
  table = null;
  constructor(playerInfo, connection) {
    this.playerInfo = playerInfo;
    this.connection = connection;
  }

  setTable(table) {
    this.table = table;
  }

  getSendClientData() {
    return {
      playerInfo: {
        id: this.playerInfo.id,
        name: this.playerInfo.name,
        chips: this.playerInfo.chips,
        gameInfo: {
          role: this.gameInfo.role,
          handCards: this.gameInfo.handCards,
          isInject: this.gameInfo.isInject,
          isAllIn: this.gameInfo.isAllIn,
          isFold: this.gameInfo.isFold,
          bestCardsInfo: {
            cards: this.gameInfo.bestCardsInfo.cards,
            formation: this.gameInfo.bestCardsInfo.formation,
            attackPower: this.gameInfo.bestCardsInfo.attackPower,
          },
        },
      },
    };
  }
}

module.exports = Player;
