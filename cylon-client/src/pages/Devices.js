import React from 'react';
import Dashboard from '../containers/Dashboard/Dashboard';

const Devices = (props) => {
    return (
        <Dashboard setRobotSelected={props.onRobotSelected} />
    )
}

export default Devices;