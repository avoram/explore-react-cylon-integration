import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DevicesContext from '../../store/devices-context';
import RobotConfig from '../RobotConfig/RobotConfig';
import './Dashboard.css';
import { API_ENDPOINTS } from '../../constants/constants-app';
import { get } from '../../services/utils';

function Dashboard(props) {
    const [devices, setDevices] = useState([]);
    const history = useHistory();
    const deviceCtx = useContext(DevicesContext);
    const onRobotSelected = (selectedPlatform, id) => {
        console.log(selectedPlatform);
        props.setRobotSelected(selectedPlatform);
        deviceCtx.devices[id].id = selectedPlatform.id;
        deviceCtx.devices[id].name = selectedPlatform.name;
        deviceCtx.devices[id].port = selectedPlatform.port;
        deviceCtx.devices[id].adaptor = selectedPlatform.adaptor;
        history.push('/configureDevice/' + id);
    }
    const addDeviceHandler = () => {
        let deviceId = Math.floor(Math.random() * 9999) + 1000;
        async function getPlatforms() {
            let response = await get(API_ENDPOINTS.ROOTURL + 'utils/getPlatforms');
            return await response.json();
        }

        getPlatforms().then((response) => {
            // console.log(response);
            deviceCtx.platforms = response;
            let newDevice = {
                deviceId: deviceId,
                id: response[0].id,
                name: response[0].name,
                port: response[0].port,
                adaptor: response[0].adaptor,
            }
            deviceCtx.devices[deviceId] = newDevice;
            setDevices([...devices, newDevice]);
        });
    }

    console.log(deviceCtx.devices);
    return (
        <div className='dashboard'>
            <h1 className='heading-title'>Robotics Framework</h1>
            <div>
                <h2>Robot Configuration</h2>
                <Button onClick={addDeviceHandler}>Add Robot</Button>
                {deviceCtx.devices && deviceCtx.devices.map((device) => (
                    <RobotConfig 
                        key={device.deviceId}
                        id={device.deviceId}
                        deviceData={device}
                        onRobotSelected={onRobotSelected}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;