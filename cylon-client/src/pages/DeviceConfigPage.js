import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeviceConfig from '../containers/DeviceConfig/DeviceConfig';
import DevicesContext from '../store/devices-context';

const DeviceConfigPage = (props) => {
    let { deviceId } = useParams();
    const [subdevices, setsubDevices] = useState([]);
    const deviceCtx = useContext(DevicesContext);
    let subdeviceId = Math.floor(Math.random() * 9999) + 1000;

    const addDeviceHandler = () => {
        console.log('Device Adding process');
        let subdeviceId = Math.floor(Math.random() * 9999) + 1000;
        deviceCtx.subdevices.push(subdeviceId);
        setsubDevices([...subdevices, subdeviceId]);
    }
    
    console.log(deviceCtx);
    return (
        <>
            <h2>Device Config</h2>
            <Button onClick={addDeviceHandler}>Add Device</Button>
            <DeviceConfig subdeviceId={subdeviceId} deviceId={deviceId} onDeviceSelected={props.onDeviceSelected} />
            {deviceCtx.subdevices && deviceCtx.subdevices.map((subdeviceId) => (
                <DeviceConfig key={subdeviceId} subdeviceId={subdeviceId} deviceId={deviceId} onDeviceSelected={props.onDeviceSelected} />
            ))}
        </>
    )
}

export default DeviceConfigPage;