const cylon = require('cylon');
const adaptor = require('cylon/lib/adaptor');
class UtiltyRobot {
  constructor() {
    this.robot = null;
  }
  getPlatforms() {
    const config = require('../constants/platform_list');
    const platformList = [];
    Object.keys(config.PLATFORM_CONFIGS).map(function (key, index) {
      platformList.push({
        id: key,
        name: config.PLATFORM_CONFIGS[key].name,
        port: config.PLATFORM_CONFIGS[key].port,
        adaptor: config.PLATFORM_CONFIGS[key].adaptor
      });
    });
    return platformList;
  }
  getDevices() {
    const config = require('../constants/device_list');
    const deviceList = [];
    Object.keys(config.DEVICE_CONFIGS).map(function (key, index) {
      deviceList.push({ id: key, name: config.DEVICE_CONFIGS[key].name, pin: config.DEVICE_CONFIGS[key].pin });
    });
    return deviceList;
  }

  getRobotConfiguration(data) {
    if (data.id === 'arduino') {
      return {
        // Change the port to the correct port for your Arduino.
        connections: {
          arduino: { adaptor: data.adaptor, port: data.port },
          // arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' },
        },
      };
    }
  }

  getDeviceConfiguration(data) {
    if (data.id === 'led') {
      return {
        devices: {
          led: { driver: 'led', pin: data.pin },
        }
      }
    }
  }
}

module.exports = new UtiltyRobot();
