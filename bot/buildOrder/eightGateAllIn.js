const {createSystem, taskFunctions} = require('@node-sc2/core');
const {CHARGE} = require('@node-sc2/core/constants/upgrade');
const {
  ASSIMILATOR,
  CYBERNETICSCORE,
  GATEWAY,
  NEXUS,
  TWILIGHTCOUNCIL,
} = require('@node-sc2/core/constants/unit-type');

const {build, upgrade} = taskFunctions;

const eightGateAllIn = createSystem({
  name: 'EightGateAllIn',
  type: 'build',
  buildOrder: [
    [16, build(ASSIMILATOR)],
    [17, build(GATEWAY)],
    [20, build(NEXUS)],
    [21, build(CYBERNETICSCORE)],
    [26, build(TWILIGHTCOUNCIL)],
    [34, upgrade(CHARGE)],
    [34, build(GATEWAY, 7)],
  ],
  async onUnitFinished({resources}, newBuilding) {
    if (newBuilding.isGasMine()) {
      const {units, actions} = resources.get();
      const threeWorkers = units.getClosest(newBuilding.pos, units.getMineralWorkers(), 3);
      threeWorkers.forEach(worker => worker.labels.set('gasWorker', true));
      return actions.mine(threeWorkers, newBuilding);
    }
  },
  async onUnitCreated({resources}, newUnit) {
    if (newUnit.isWorker()) {
      const {actions} = resources.get();
      return actions.gather(newUnit);
    }
  }
});

module.exports = {eightGateAllIn};