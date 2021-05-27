const cylon = require('cylon');

class LEDRobot {
  constructor() {
    this.robot = null;
  }
  setLedRobotConfiguration() {
    this.robot = cylon
      .robot({
        // Change the port to the correct port for your Arduino.
        connections: {
          arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' },
        },
        devices: {
          led: { driver: 'led', pin: 13 },
        },
      })
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
