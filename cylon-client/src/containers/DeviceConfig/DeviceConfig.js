
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './DeviceConfig.css';
import { API_ENDPOINTS } from '../../constants/constants-app';

function DeviceConfig() {
    const [deviceList, setDeviceList] = useState([]);
    React.useEffect(() => {
        async function getPlatforms() {
            setDeviceList([]);
            let response = await fetch(API_ENDPOINTS.ROOTURL + 'utils/getDevices');
            response = await response.json();
            setDeviceList(response);
        }
        getPlatforms();
    }, []);
    return (
        <div className='device-config'>
            <Container>
                <Row>
                    <Col xs={10}>
                        <Form.Control as="select" aria-label="Select Device">
                            {deviceList.map(item => (
                                <option key={item.id} value={item.id} >
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col xs={2}>
                        <Button variant="primary">Test</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DeviceConfig;
