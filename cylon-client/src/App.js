import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const setLEDConfiguration = () => {
    fetch('http://localhost:9000/cylonRoute/setLedRobotConfiguration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Change the port to the correct port for your Arduino.
        connections: {
          arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' },
        },
        devices: {
          led: { driver: 'led', pin: 13 },
        },
      })
    })
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const startLED = () => {
    fetch('http://localhost:9000/cylonRoute/startLED')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const stopLED = () => {
    fetch('http://localhost:9000/cylonRoute/stopLED')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  return (
    <div className='App'>
      <Button variant='primary' onClick={setLEDConfiguration}>
        Configure LED
      </Button>
      <Button variant='success' onClick={startLED}>
        Start the LED
      </Button>
      <Button variant='danger' onClick={stopLED}>
        Stop the LED
      </Button>
      <p className='App-intro'>{apiResponse}</p>
    </div>
  );
}

export default App;
