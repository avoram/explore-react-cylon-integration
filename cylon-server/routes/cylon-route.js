const express = require("express");
const Cylon = require("cylon");
const router = express.Router();

var robot = Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/cu.usbmodem14201" },
  },

  devices: {
    led: { driver: "led", pin: 13 },
  },
}).start();

router.get("/startLED", function (req, res, next) {
  robot.devices.led.turnOn();
  res.send("LED Started");
});
router.get("/stopLED", function (req, res, next) {
    robot.devices.led.turnOff();
    res.send("LED Stopped");
  });

module.exports = router;
