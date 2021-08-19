import React from 'react';
import { useParams } from 'react-router-dom';
import DeviceConfig from '../containers/DeviceConfig/DeviceConfig';

const DeviceConfigPage = (props) => {
    let { deviceId } = useParams();
    return (
        <>
            <h2>Device Config</h2>
            <DeviceConfig deviceId={deviceId} onDeviceSelected={props.onDeviceSelected} />
        </>
    )
}

export default DeviceConfigPage;