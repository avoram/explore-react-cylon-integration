const cylon = require('cylon');
class LEDRobot {
  constructor() {
    this.robot = null;
  }
  async setLedRobotConfiguration(configuration) {
    return new Promise((resolve, reject) => {
      const robot = configuration.robot;
      const device = configuration.device;
      const connnectionParams = {};
      const devicesParams = {};
      let robotConfiguration = {};
      // if (robot.id === 'arduino') {
      connnectionParams[robot.id] = {
        adaptor: robot.adaptor,
        port: robot.port,
      };
      // }
      // if (device.id === 'led') {
      devicesParams[device.id] = {
        driver: device.id,
        pin: device.pin,
      };
      // }
      // this.robot = 
      // if (this.robot) {

      // }
      try {
        if (cylon.MCP.robots[robot.robotId]) {
          cylon.MCP.robots[robot.robotId].connections[robot.id] && cylon.MCP.robots[robot.robotId].connections[robot.id].removeAllListeners();
          cylon.MCP.robots[robot.robotId].connections[robot.id] && cylon.MCP.robots[robot.robotId].connections[robot.id].disconnect();
          cylon.MCP.robots[robot.robotId].removeAllListeners();
          cylon.MCP.robots[robot.robotId].halt();
          delete cylon.MCP.robots[robot.robotId];
        }
        //   cylon.MCP.robots[robot.robotId].connection(robot.id, connnectionParams[robot.id]).device(device.id, devicesParams[device.id]);
        // } else {
        robotConfiguration = {
          name: robot.robotId,
          connections: connnectionParams,
          devices: devicesParams
        };
        this.robot = cylon.robot(robotConfiguration).on('error', err => {
          reject({ statusCode: 'FAIL', statusMessage: err.message });
        }).on('ready', status => {
          resolve({ statusCode: 'OK', statusMessage: status });
        });
        this.robot.start();
        // }
        console.log(robotConfiguration);
      } catch (err) {
        console.error({ statusCode: 'FAIL', statusMessage: err });
        reject({ statusCode: 'FAIL', statusMessage: err.message });
      }
    });
  }
  startLED() {
    console.log('START LED');
    try {
      this.robot.devices.led.turnOn();
    } catch (error) {
      console.log(error);
    }
  }
  stopLED() {
    console.log('STOP LED');
    try {
      this.robot.devices.led.turnOff();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LEDRobot();
