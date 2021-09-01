
import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import DevicesContext from '../../store/devices-context';
import './RobotConfig.css';

function RobotConfig(props) {
    const { id, deviceData, onRobotSelected } = props;
    let [selectedPlatform, setSelectedPlatform] = useState([]);
    const deviceCtx = useContext(DevicesContext);
    const platForms = deviceCtx.platforms;
   
    const changedPlatform = (event) => {
        setSelectedPlatform(platForms.find(ele => ele.id === event.target.value));
    }
    
    const addDevice = (id) => {
        onRobotSelected(selectedPlatform, id);
    }
    
    const onPortChange = (event) => {
        selectedPlatform = { ...selectedPlatform, port: event };
        setSelectedPlatform(selectedPlatform);
        return true;
    }

    console.log(deviceData);
    return (
        <div className='robot-config'>
            <Container>
                <Row>
                    <Col xs={9} className="controls-section">
                        <Form.Group >
                            <Form.Label>Platform</Form.Label>
                            <Form.Control onChange={changedPlatform} as="select" aria-label="Select Platform">
                                {platForms.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Adaptor</Form.Label>
                            <Form.Control type="text" value={deviceData.adaptor || ''} readOnly />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Port</Form.Label>
                            <Form.Control type="text" value={deviceData.port || ''} onChange={e => onPortChange(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={3} className="buttons-section">
                        <Button onClick={() => addDevice(id)} variant="primary">Configure Devices</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default RobotConfig;