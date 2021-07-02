import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../constants/constants-app';
import DeviceConfig from '../DeviceConfig/DeviceConfig';
import RobotConfig from '../RobotConfig/RobotConfig';
import './Dashboard.css';

function Dashboard() {
    const [apiResponse, setApiResponse] = useState('');
    const [robotSelected, setRobotSelected] = useState('');
    const onRobotSelected = (event) => {
        console.log(event);
        setRobotSelected(event);
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

            {Object.keys(robotSelected).length ?
                <div>
                    <h2>Device Config</h2>
                    <DeviceConfig></DeviceConfig>
                </div>
                :
                <div>
                    <h2>Robot Config</h2>
                    <RobotConfig onRobotSelected={onRobotSelected}></RobotConfig>
                    <RobotConfig onRobotSelected={onRobotSelected}></RobotConfig>
                </div>
            }
        </div>
    );
}

export default Dashboard;
