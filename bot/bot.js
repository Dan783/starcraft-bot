const {createAgent} = require('@node-sc2/core');
const {protossSupplySystem} = require('./supplySystem/protossSupplySystem');
const {eightGateAllIn} = require('./buildOrder/eightGateAllIn');

const bot = createAgent();

bot.use(eightGateAllIn);
bot.use(protossSupplySystem);

module.exports = {
  bot
};
