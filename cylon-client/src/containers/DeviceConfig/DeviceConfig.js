
import React, { useContext, useState, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DevicesContext from '../../store/devices-context';
import './DeviceConfig.css';

function DeviceConfig(props) {
    let { robotId, deviceId } = props;
    let [selectedDevice, setSelectedDevice] = useState([]);
    const context = useContext(DevicesContext);
    const allDevices = context.allDevices;
    let deviceRef = useRef();
    let pinRef = useRef();
    // setSelectedDevice(device);
    const changedDevice = (event) => {
        const selected = allDevices.find(d => d.id === event.target.value);
        props.onDeviceUpdated(robotId, deviceId, { deviceId: deviceId, ...selected });
        setSelectedDevice(selected);
    }
    const testDevice = (id) => {
        // props.onDeviceSelected(selectedDevice, deviceRef.current.value, pinRef.current.value, subdeviceId);
        props.onTestDevice(robotId, deviceId);
    }
    const onPinChange = (event) => {
        const selected = context.selectedRobots[robotId].selectedDevices[deviceId];
        const deviceToUpdate = { ...selected, pin: event };
        props.onDeviceUpdated(robotId, deviceId, { deviceId: deviceId, ...deviceToUpdate });
        setSelectedDevice(deviceToUpdate);

        return true;
    }
    return (
        <div className='device-config'>
            <Container>
                <Row>
                    <Col xs={6}>
                        <Form.Control onChange={changedDevice} as="select" aria-label="Select Device" ref={deviceRef} value={context.selectedRobots[robotId].selectedDevices[deviceId].id}>
                            {allDevices.map(item => (
                                <option key={item.id} value={item.id} >
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col xs={3}>
                        <Form.Control type="number" min="0" max="100" placeholder="Pin" value={context.selectedRobots[robotId].selectedDevices[deviceId].pin || ''} required onChange={e => onPinChange(e.target.value)} ref={pinRef}></Form.Control>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => testDevice()} variant="primary">Test Device</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DeviceConfig;
