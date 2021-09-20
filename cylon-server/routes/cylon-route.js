const express = require('express');
const Cylon = require('cylon');
const router = express.Router();
const LEDRobot = require('../robots/led-robot');

router.post('/setRobotConfiguration', async (req, res) => {
  // Initialize the LED Robot
  console.log('req is :: ', req.body);
  const data = req.body;
  // if (data.device.id === 'led') {
  await LEDRobot.setLedRobotConfiguration(data).then(resData => {
    res.send(resData);
  }).catch(err => {
    res.send(err);
  });
  // }
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
