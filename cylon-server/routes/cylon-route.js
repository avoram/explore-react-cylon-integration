const express = require("express");
const Cylon = require("cylon");
const router = express.Router();

router.get("/startLED", function (req, res, next) {
  // Initialize the robot
  console.log('START LED')
  Cylon.robot({
    // Change the port to the correct port for your Arduino.
    connections: {
      arduino: { adaptor: "firmata", port: "/dev/ttyACM0" },
    },

    devices: {
      led: { driver: "led", pin: 13 },
    },

    work: function (my) {
      every((1).second(), function () {
        my.led.toggle();
      });
    },
  }).start();
  res.send("LED Started");
});
router.get("/stopLED", function (req, res, next) {
    // Initialize the robot
    console.log('STOP LED')
    Cylon.robot({
      // Change the port to the correct port for your Arduino.
      connections: {
        arduino: { adaptor: "firmata", port: "/dev/ttyACM0" },
      },
  
      devices: {
        led: { driver: "led", pin: 13 },
      },
  
      work: function (my) {
        every((1).second(), function () {
          my.led.toggle();
        });
      },
    }).start();
    res.send("LED Stopped");
  });

module.exports = router;
