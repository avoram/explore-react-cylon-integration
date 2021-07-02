module.exports.PLATFORM_CONFIGS = {
    arduino: { name: 'Arduino', adaptor: 'firmata', port: '/dev/ttyACM0', provider: 'cylon' },
    mqtt: { name: 'MQTT', adaptor: 'mqtt', host: 'mqtt://localhost:1883', provider: 'cylon' },
    raspi: { name: 'Raspberry Pi', adaptor: 'raspi', provider: 'cylon' }
};