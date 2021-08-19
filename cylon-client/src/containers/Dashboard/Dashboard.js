import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DevicesContext from '../../store/devices-context';
import RobotConfig from '../RobotConfig/RobotConfig';
import './Dashboard.css';

function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const history = useHistory();
    const deviceCtx = useContext(DevicesContext);
    const onRobotSelected = (event, id) => {
        props.setRobotSelected(event);
        history.push('/configureDevice/' + id);
    }
    const addDeviceHandler = () => {
        let deviceId = Math.floor(Math.random() * 9999) + 1000;
        deviceCtx.devices.push(deviceId)
        setDevices([...devices, deviceId]);
    }

    return (
        <div className='dashboard'>
            <h1 className='heading-title'>Robotics Framework</h1>
            <div>
                <h2>Robot Configuration</h2>
                <Button onClick={addDeviceHandler}>Add Robot</Button>
                {deviceCtx.devices && deviceCtx.devices.map((deviceId) => (
                    <RobotConfig key={deviceId} id={deviceId} onRobotSelected={onRobotSelected} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
