const express = require('express');
const Cylon = require('cylon');
const router = express.Router();
const LEDRobot = require('../robots/led-robot');

router.post('/setLedRobotConfiguration', (req, res) => {
  // Initialize the LED Robot
  console.log('req is :: ', req.body);
  console.log('Type', typeof req.body);
  LEDRobot.setLedRobotConfiguration(req.body);
  res.send('LED Configuration Successful!');
});
router.get('/startLED', function (req, res, next) {
  // Start the LED
  LEDRobot.startLED();
  res.send('LED Started');
});
router.get('/stopLED', function (req, res, next) {
  // Start the LED
  LEDRobot.stopLED();
  res.send('LED Stopped');
});

module.exports = router;
