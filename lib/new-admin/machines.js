const machineLoader = require('../machine-loader')
const { UserInputError } = require('apollo-server-express')

function getMachine (machineId) {
  return machineLoader.getMachines()
    .then(machines => machines.find(({ deviceId }) => deviceId === machineId))
}

function machineAction ({ deviceId, action, cassette1, cassette2 }) {
  return getMachine(deviceId)
    .then(machine => {
      if (!machine) throw new UserInputError(`machine:${deviceId} not found`, { deviceId })
      return machine
    })
    .then(machineLoader.setMachine({ deviceId, action, cassettes: [cassette1, cassette2] }))
    .then(getMachine(deviceId))
}

module.exports = { machineAction }
