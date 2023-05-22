const { WebsocketCommand } = require("../server/types");
00;
const {
  makeWebSocketResponseData,
  shuffledArray,
  getPlayerByRole,
} = require("../server/utils/utils");
const { PlayerRole, CardFormation, Camp, AttackPower } = require("./Types");

const TIME_OUT = 1000;
class Table {
  maxPlayers = 4;
  currentRound = 0;
  cards = [];
  constructor() {
    this.isGameStart = false;
    this.playersInTable = [];
    this.playersOutTable = [];
  }

  addPlayerToTable(player) {
    if (this.playersInTable.length < this.maxPlayers) {
      this.playersInTable.push(player);
    } else {
      this.playersOutTable.push(player);
    }
    console.log("addPlayerToTable=======");
    console.log(this.playersInTable);
    console.log(this.playersOutTable);
    console.log("addPlayerToTable=======");
    this.wsSendPlayersInTable();
    if (!this.isGameStart) {
      if (this.playersInTable.length >= this.maxPlayers) {
        this.wsGamePrepare();
      } else {
        this.wsWaitingGameStart();
      }
    }
  }

  removePlayerFromTable(playerToRemove) {
    this.playersInTable = this.playersInTable.filter((player) => {
      return player.playerInfo.id !== playerToRemove.playerInfo.id;
    });
    this.playersOutTable = this.playersOutTable.filter((player) => {
      return player.playerInfo.id !== playerToRemove.playerInfo.id;
    });
    this.isGameStart = false;
    this.wsSendPlayersInTable();
  }

  checkIsGameStart() {
    return this.isGameStart;
  }

  /**
   * 以下逻辑是牌桌操作的核心逻辑
   */
  gameStart() {
    for (let i = 0; i < this.playersInTable.length; i++) {
      let player = this.playersInTable[i];
      player.gameInfo = {
        role: PlayerRole.Normal,
        nextPlayer:
          this.playersInTable[i === this.playersInTable.length - 1 ? 0 : i + 1],
        handCards: [],
        isInject: false,
        isAllIn: false,
        isFold: false,
        orderIndex: i,
        bestCardsInfo: {
          cards: [],
          formation: CardFormation.NoCards,
          attackPower: 0,
        },
      };
    }

    this.wsGameStart();
  }

  initCards() {
    let campTypeCount = Object.keys(Camp).length;
    let attackTypeCount = Object.keys(AttackPower).length;

    for (let i = 0; i < campTypeCount; i++) {
      for (let j = 0; j < attackTypeCount; j++) {
        this.cards.push({
          camp: Camp[Object.keys(Camp)[i]],
          attackPower: AttackPower[Object.keys(AttackPower)[j]],
        });
      }
    }

    this.cards = shuffledArray(this.cards);

    console.log("initCards======================");
    console.log(this.cards);
    console.log("initCards======================");
  }

  getDispatchChamberCards() {
    return this.cards.splice(0, 2);
  }

  distributeCharactor() {
    let commander = this.playersInTable[this.currentRound];
    commander.gameInfo.role = PlayerRole.Commander;
    let reserve = commander.gameInfo.nextPlayer;
    reserve.gameInfo.role = PlayerRole.Reserve;
    let main = reserve.gameInfo.nextPlayer;
    main.gameInfo.role = PlayerRole.Main;

    this.wsGameRoundDistributeCharactor(
      this.playersInTable.map((player) => {
        return { id: player.playerInfo.id, role: player.gameInfo.role };
      })
    );
  }

  dispatchChamber() {
    this.initCards();
    let dispatchResult = [];
    let startPlayer = getPlayerByRole(this.playersInTable, PlayerRole.Reserve);
    let startPlayerId = startPlayer.playerInfo.id;
    do {
      let handCards = this.getDispatchChamberCards();
      startPlayer.gameInfo.handCards = handCards;
      dispatchResult.push({
        id: startPlayer.playerInfo.id,
        handCards: startPlayer.gameInfo.handCards,
      });
      startPlayer = startPlayer.gameInfo.nextPlayer;
    } while (startPlayer.playerInfo.id !== startPlayerId);
    this.wsGameRoundDispatchChamber(dispatchResult);
  }

  /**
   * 以下逻辑都是websocket发送消息的逻辑
   */
  wsSendPlayersInTable() {
    this.wsSendDataToAllPlayers(
      WebsocketCommand.RefreshPlayerSeatInGame,
      this.playersInTable.map((player) => player.playerInfo)
    );
  }

  wsWaitingGameStart() {
    this.wsSendDataToAllPlayers(WebsocketCommand.WaitingGameStart);
  }

  wsGamePrepare() {
    this.wsSendDataToAllPlayers(WebsocketCommand.GamePrepare);
    setTimeout(() => {
      this.gameStart();
    }, TIME_OUT);
  }

  wsGameStart() {
    this.isGameStart = true;
    this.wsSendDataToAllPlayers(WebsocketCommand.GameStart);
    setTimeout(() => {
      this.wsGameRoundStart();
    }, TIME_OUT);
  }

  wsGameRoundStart() {
    this.wsSendDataToAllPlayers(WebsocketCommand.RoundStart, {
      currentRound: this.currentRound + 1,
    });
    setTimeout(() => {
      this.distributeCharactor();
    }, TIME_OUT);
  }

  wsGameRoundDistributeCharactor(data) {
    this.wsSendDataToAllPlayers(WebsocketCommand.DistributeCharactor, data);
    setTimeout(() => {
      this.dispatchChamber();
    }, TIME_OUT);
  }

  wsGameRoundDispatchChamber(data) {
    this.playersInTable.forEach((player) => {
      if (player.connection) {
        data.forEach((item) => {
          if (player.playerInfo.id !== item.id) {
            item.handCards[0].camp = -1;
            item.handCards[1].camp = -1;
            item.handCards[0].attackPower = -1;
            item.handCards[1].attackPower = -1;
          }
        });
        player.connection.sendText(
          makeWebSocketResponseData(WebsocketCommand.DispatchChamber, data)
        );
      }
    });
    setTimeout(() => {}, TIME_OUT);
  }

  wsSendDataToAllPlayers(command, data = null) {
    this.playersInTable.forEach((player) => {
      if (player.connection) {
        player.connection.sendText(makeWebSocketResponseData(command, data));
      }
    });
  }
}

module.exports = Table;
