const cylon = require('cylon');
class LEDRobot {
  constructor() {
    this.robot = null;
  }
  setLedRobotConfiguration(configuration) {
    const robot = configuration.robot;
    const device = configuration.device;
    const connnectionParams = {};
    const devicesParams = {};
    if (robot.id === 'arduino') {
      connnectionParams.arduino = {
        adaptor: robot.adaptor,
        port: robot.port,
      };
    }
    if (device.id === 'led') {
      devicesParams.led = {
        driver: device.id,
        pin: device.pin,
      };
    }
    const robotConfiguration = {
      connections: connnectionParams,
      devices: devicesParams
    };
    console.log(robotConfiguration);
    try {
      this.robot = cylon
        .robot(robotConfiguration)
        .start();
      return 'OK';
    } catch (err) {
      return 'FAIL';
    }
  }
  startLED() {
    console.log('START LED');
    this.robot.devices.led.turnOn();
  }
  stopLED() {
    console.log('STOP LED');
    this.robot.devices.led.turnOff();
  }
}

module.exports = new LEDRobot();
