import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import TestDevice from './containers/TestDevice/TestDevice';
import DeviceConfigPage from './pages/DeviceConfigPage';
import Devices from './pages/Devices';

function App() {
  const [robotSelected, setRobotSelected] = useState('');
  const [deviceSelected, setDeviceSelected] = useState('');
  const history = useHistory();
  const onRobotSelected = (event) => {
    setRobotSelected(event);
  }
  const onDeviceSelected = (event) => {
    setDeviceSelected(event);
    history.push('/testRobot');
  }
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
          <TestDevice robotSelected={robotSelected} deviceSelected={deviceSelected} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
