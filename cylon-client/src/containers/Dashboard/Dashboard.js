import React, { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../constants/constants-app';
import DeviceConfig from '../DeviceConfig/DeviceConfig';
import RobotConfig from '../RobotConfig/RobotConfig';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import DevicesContext from '../../store/devices-context';

function Dashboard() {
    const [apiResponse, setApiResponse] = useState('');
    const [robotSelected, setRobotSelected] = useState('');
    const [devices, setDevices] = useState([]);
    const history = useHistory();
    const deviceCtx = useContext(DevicesContext);
    console.log(deviceCtx);
    const onRobotSelected = (event,id) => {
        console.log(history);
        // event.preventDefault();
        setRobotSelected(event);
        history.push('/configureDevice/' + id );
    }
    const startLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/startLED')
            .then((res) => res.text())
            .then((res) => setApiResponse(res));
    };
    const stopLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/stopLED')
            .then((res) => res.text())
            .then((res) => setApiResponse(res));
    };

    const addDeviceHandler = () => {
        let deviceId = Math.floor(Math.random() * 9999) + 1000;
        deviceCtx.devices.push(deviceId)
        setDevices([...devices, deviceId]);
    }

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            {/* <Button variant='primary' onClick={setLEDConfiguration}>
                Configure LED
            </Button>
            <Button variant='success' onClick={startLED}>
                Start the LED
            </Button>
            <Button variant='danger' onClick={stopLED}>
                Stop the LED
            </Button> */}
            <div>
                <h2>Robot Config</h2>
                <Button onClick={addDeviceHandler}>Add Device</Button>
                {deviceCtx.devices && deviceCtx.devices.map((deviceId) => (
                    <RobotConfig key={deviceId} id={deviceId} onRobotSelected={onRobotSelected} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
