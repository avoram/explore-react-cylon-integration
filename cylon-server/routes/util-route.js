const express = require('express');
const Cylon = require('cylon');
const router = express.Router();
const UtiltyRobot = require('../robots/util-robot');

router.get('/getPlatforms', (req, res) => {
  // Get all the Platforms
  const allPlatforms = UtiltyRobot.getPlatforms();
  res.send(allPlatforms);
});
router.get('/getDevices', function (req, res, next) {
  // Get all the devices
  const allDevices = UtiltyRobot.getDevices();
  res.send(allDevices);
});
module.exports = router;
