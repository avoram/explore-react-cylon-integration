const cylon = require('cylon');
class LEDRobot {
  constructor() {
    this.robot = null;
  }
  setLedRobotConfiguration(configuration) {
    const robotConfiguration = configuration;
    this.robot = cylon
      .robot(robotConfiguration)
      .start();
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
