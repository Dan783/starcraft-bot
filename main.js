const {createAgent, createEngine, createPlayer} = require('@node-sc2/core');
const {Difficulty, Race} = require('@node-sc2/core/constants/enums');

const bot = createAgent({
  async onGameStart({resources}) {
    const {units, actions, map} = resources.get();

    const workers = units.getWorkers();
    return actions.attackMove(workers, map.getEnemyMain().townhallPosition);
  }
});

const engine = createEngine();

engine.connect().then(() => {
  return engine.runGame('Thunderbird LE', [
    createPlayer({race: Race.ZERG}, bot),
    createPlayer({race: Race.RANDOM, difficulty: Difficulty.VERYEASY}),
  ]);
});