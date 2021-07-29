import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Devices from './pages/Devices';
import DeviceConfigPage from './pages/DeviceConfigPage';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path={['/devices', '/']} exact>
          <Devices/>
        </Route>
        <Route path='/configureDevice/:id'>
          <DeviceConfigPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
