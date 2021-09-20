
import React, { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DevicesContext from '../../store/devices-context';
import './RobotConfig.css';

function RobotConfig(props) {
    const { id, selectedRobot, onRobotSelected } = props;
    const history = useHistory();
    const deviceCtx = useContext(DevicesContext);
    const allPlatforms = deviceCtx.allPlatforms;

    const changedPlatform = (event) => {
        onRobotSelected({ ...selectedRobot, id: event.target.value }, id);
    }

    const addDevice = (id) => {
        onRobotSelected(selectedRobot, id);
        history.push('/configureDevice/' + id);
    }

    const onPortChange = (event) => {
        onRobotSelected({ ...selectedRobot, port: event }, id);
        return true;
    }

    console.log(selectedRobot);
    return (
        <div className='robot-config'>
            <Container>
                <Row>
                    <Col xs={9} className="controls-section">
                        <Form.Group >
                            <Form.Label>Platform</Form.Label>
                            <Form.Control onChange={changedPlatform} as="select" aria-label="Select Platform" value={selectedRobot.id}>
                                {allPlatforms.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Adaptor</Form.Label>
                            <Form.Control type="text" value={selectedRobot.adaptor || ''} readOnly />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Port</Form.Label>
                            <Form.Control type="text" value={selectedRobot.port || ''} onChange={e => onPortChange(e.target.value)} />
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