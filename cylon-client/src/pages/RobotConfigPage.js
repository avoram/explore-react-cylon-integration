import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import RobotConfig from '../containers/RobotConfig/RobotConfig';
import DevicesContext from '../store/devices-context';


function RobotConfigPage(props) {
    const [selectedRobots, setSelectedRobots] = useState([]);
    const context = useContext(DevicesContext);
    const onRobotSelected = (selectedPlatform, id) => {
        // let deviceId = Math.floor(Math.random() * 9999) + 1000;
        // const addedDevice = {
        //     deviceId: deviceId,
        //     id: context.allDevices[0].id,
        //     name: context.allDevices[0].name,
        //     pin: context.allDevices[0].port,
        // };
        // context.selectedRobots[id].selectedDevices[deviceId] = addedDevice;
        context.selectedRobots[id].id = selectedPlatform.id;
        context.selectedRobots[id].name = selectedPlatform.name;
        context.selectedRobots[id].port = selectedPlatform.port;
        context.selectedRobots[id].adaptor = selectedPlatform.adaptor;
        props.setRobotSelected(selectedPlatform);

    }
    const addRobotHandler = () => {
        let robotId = Math.floor(Math.random() * 9999) + 1000 + '';
        let addedRobot = {
            robotId: robotId,
            id: context.allPlatforms[0].id,
            name: context.allPlatforms[0].name,
            port: context.allPlatforms[0].port,
            adaptor: context.allPlatforms[0].adaptor,
            selectedDevices: {}
        }
        context.selectedRobots[robotId] = addedRobot;
        setSelectedRobots({...selectedRobots, addedRobot});

    }

    console.log(context.selectedRobots);
    return (
        <div>
            <h2>Robot Configuration</h2>
            <Button onClick={addRobotHandler}>Add Robot</Button>
            {Object.values(context.selectedRobots).map(robot => (
                <RobotConfig
                    key={robot.robotId}
                    id={robot.robotId}
                    selectedRobot={robot}
                    onRobotSelected={onRobotSelected}
                />
            ))}
        </div>
    );
}

export default RobotConfigPage;