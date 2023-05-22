const PlayerRole = {
  Commander: 0, // 指挥官
  Reserve: 1, // 预备役
  Main: 2, // 主力役
  Normal: 3, // 普通玩家
};

const Camp = {
  Griffin: 0, // 狮鹫王国
  Forest: 1, // 翡翠森林
  Ice: 2, // 寒冰要塞
  Lava: 3, // 熔岩领地
};

const AttackPower = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Night: 9,
  Ten: 10,
  Eleven: 11,
  Twelve: 12,
  Thirteen: 13,
};

const CardFormation = {
  NoCards: 0,
  Skirmish: 1, // 散兵突击 - 啥都没
  TwoHero: 2, // 双英雄 - 一对
  UnionLegion: 3, // 联盟军团 - 两对
  EliteUnit: 4, // 精英部队 - 三条
  BattleFormation: 5, // 战斗编队 - 顺子
  AlliancePower: 6, // 同盟之力 - 同花
  HeavyKnight: 7, // 重装骑士 - 三条带一对
  ElementalLord: 8, // 元素领主 - 四条
  Stormtrooper: 9, // 风暴战士 - 同花顺
  GodPossession: 10, // 神祇附体 - 最大的同花顺 10 11 12 13 1
};

module.exports = {
  PlayerRole,
  Camp,
  AttackPower,
  CardFormation,
};
