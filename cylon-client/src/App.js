import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DevicesContext from './store/devices-context';
import './App.css';
import { API_ENDPOINTS } from './constants/constants-app';
import TestDevice from './containers/TestDevice/TestDevice';
import DeviceConfigPage from './pages/DeviceConfigPage';
import RobotConfigPage from './pages/RobotConfigPage';
import { get } from './services/utils';

function App() {
  const [robotSelected, setRobotSelected] = useState('');
  const [deviceSelected, setDeviceSelected] = useState('');
  const history = useHistory();
  const context = useContext(DevicesContext);
  const onTestDevice = (selectedRobot, selectedDevice) => {
    setDeviceSelected(selectedDevice);
    setRobotSelected(selectedRobot);
    history.push('/testRobot/' + selectedDevice.deviceId);
  }
  async function getPlatforms() {
    let response = await get(API_ENDPOINTS.ROOTURL + 'utils/getPlatforms');
    return response.json();
  }
  async function getDevices() {
    let response = await get(API_ENDPOINTS.ROOTURL + 'utils/getDevices');
    return response.json();
  }
  useEffect(() => {
    getPlatforms().then((response) => {
      context.allPlatforms = response;
    });
    getDevices().then((response) => {
      context.allDevices = response;
    });
  }, []);

  return (
    <div className='App'>
      <div className='dashboard'>
        <h1 className='heading-title'>Robotics Framework</h1>
        <Switch>
          <Route path={['/robots', '/']} exact>
            <RobotConfigPage setRobotSelected={setRobotSelected} />
          </Route>
          <Route path='/configureDevice/:id'>
            <DeviceConfigPage onTestDevice={onTestDevice} />
          </Route>
          <Route path='/testRobot'>
            <TestDevice robotSelected={robotSelected} deviceSelected={deviceSelected} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
