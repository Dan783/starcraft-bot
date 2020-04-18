const {createEngine, createPlayer} = require('@node-sc2/core');
const {Difficulty, Race} = require('@node-sc2/core/constants/enums');
const {bot} = require('./bot/bot');

const engine = createEngine();

engine.connect().then(() => {
  return engine.runGame('Proxima Station LE', [
    createPlayer({race: Race.PROTOSS}, bot),
    createPlayer({race: Race.RANDOM, difficulty: Difficulty.VERYEASY}),
  ]);
});