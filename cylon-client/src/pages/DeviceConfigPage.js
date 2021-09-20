import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeviceConfig from '../containers/DeviceConfig/DeviceConfig';
import DevicesContext from '../store/devices-context';
import { API_ENDPOINTS } from '../constants/constants-app';

const DeviceConfigPage = (props) => {
    let { id } = useParams();
    const context = useContext(DevicesContext);
    const [selectedRobots, setSelectedRobots] = useState([]);

    const addDeviceHandler = () => {
        console.log('Device Adding process');
        const deviceId = Math.floor(Math.random() * 9999) + 1000 + '';
        const addedDevice = {
            deviceId: deviceId,
            id: context.allDevices[0].id,
            name: context.allDevices[0].name,
            pin: context.allDevices[0].pin,
        };
        context.selectedRobots[id].selectedDevices[deviceId] = addedDevice;
        console.log(context);
        setSelectedRobots({ ...context.selectedRobots, id: context.selectedRobots[id] });
    }
    const onDeviceUpdated = (robotId, deviceId, device) => {
        context.selectedRobots[robotId].selectedDevices[deviceId] = device;
    }
    const onDeviceTest = (robotId, deviceId) => {
        props.onTestDevice(context.selectedRobots[robotId], context.selectedRobots[robotId].selectedDevices[deviceId])
    }
    console.log(context);

    return (
        <>
            <h2>Device Config</h2>
            <Button onClick={addDeviceHandler}>Add Device</Button>
            {Object.keys(context.selectedRobots[id].selectedDevices).map(deviceId => (
                <DeviceConfig robotId={id} key={deviceId} deviceId={deviceId} onDeviceUpdated={onDeviceUpdated} onTestDevice={onDeviceTest} />
            ))}
        </>
    )
}

export default DeviceConfigPage;