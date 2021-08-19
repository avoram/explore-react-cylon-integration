
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './RobotConfig.css';
import { API_ENDPOINTS } from '../../constants/constants-app';
import { get } from '../../services/utils';

function RobotConfig(props) {
    let { id } = props;
    let [platformList, setPlatformList] = useState([]);
    let [selectedPlatform, setSelectedPlatform] = useState([]);
    React.useEffect(() => {
        async function getPlatforms() {
            setPlatformList([]);
            let response = await get(API_ENDPOINTS.ROOTURL + 'utils/getPlatforms');
            response = await response.json();
            setPlatformList(response);
            setSelectedPlatform(response[0]);
        }
        getPlatforms();
    }, []);
    const changedPlatform = (event) => {
        setSelectedPlatform(platformList.find(ele => ele.id === event.target.value));
    }
    const addDevice = (id) => {
        props.onRobotSelected(selectedPlatform, id);
    }
    const onPortChange = (event) => {
        selectedPlatform = { ...selectedPlatform, port: event };
        setSelectedPlatform(selectedPlatform);
        return true;
    }

    return (
        <div className='robot-config'>
            <Container>
                <Row>
                    <Col xs={9} className="controls-section">
                        <Form.Group >
                            <Form.Label>Platform</Form.Label>
                            <Form.Control onChange={changedPlatform} as="select" aria-label="Select Platform">
                                {platformList.map(item => (
                                    <option key={item.id} value={item.id} >
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Adaptor</Form.Label>
                            <Form.Control type="text" value={selectedPlatform.adaptor || ''} readOnly />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Port</Form.Label>
                            <Form.Control type="text" value={selectedPlatform.port || ''} onChange={e => onPortChange(e.target.value)} />
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
