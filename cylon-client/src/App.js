import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import TestDevice from './containers/TestDevice/TestDevice';
import DeviceConfigPage from './pages/DeviceConfigPage';
import Devices from './pages/Devices';

function App() {
  const [robotSelected, setRobotSelected] = useState('');
  const [deviceSelected, setDeviceSelected] = useState('');
  const [deviceDetails, setDeviceDetails] = useState({});
  const history = useHistory();
  const onRobotSelected = (event) => {
    setRobotSelected(event);
  }
  const onDeviceSelected = (selectedDevice, deviceName, pinValue, subdeviceId) => {
    setDeviceSelected(selectedDevice);
    setDeviceDetails({deviceName,pinValue})
    history.push('/testRobot/' + subdeviceId);
  }
  console.log(deviceDetails);
  return (
    <div className='App'>
      <Switch>
        <Route path={['/devices', '/']} exact>
          <Devices onRobotSelected={onRobotSelected} />
        </Route>
        <Route path='/configureDevice/:id'>
          <DeviceConfigPage onDeviceSelected={onDeviceSelected} />
        </Route>
        <Route path='/testRobot'>
          <TestDevice robotSelected={robotSelected} deviceSelected={deviceSelected} deviceDetails={deviceDetails}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
