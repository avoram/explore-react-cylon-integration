
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../constants/constants-app';
import './DeviceConfig.css';

function DeviceConfig(props) {
    const [deviceList, setDeviceList] = useState([]);
    let [selectedDevice, setSelectedDevice] = useState([]);
    React.useEffect(() => {
        async function getDevices() {
            setDeviceList([]);
            let response = await fetch(API_ENDPOINTS.ROOTURL + 'utils/getDevices');
            response = await response.json();
            setDeviceList(response);
            setSelectedDevice(response[0]);
        }
        getDevices();
    }, []);

    const changedDevice = (event) => {
        setSelectedDevice(deviceList.find(ele => ele.id === event.target.value));
    }
    const testDevice = (id) => {
        props.onDeviceSelected(selectedDevice);
    }
    const onPinChange = (event) => {
        selectedDevice = { ...selectedDevice, pin: event };
        setSelectedDevice(selectedDevice);
        return true;
    }
    return (
        <div className='device-config'>
            <Container>
                <Row>
                    <Col xs={6}>
                        <Form.Control onChange={changedDevice} as="select" aria-label="Select Device">
                            {deviceList.map(item => (
                                <option key={item.id} value={item.id} >
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col xs={3}>
                        <Form.Control type="number" min="0" max="100" placeholder="Pin" required onChange={e => onPinChange(e.target.value)}></Form.Control>
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
