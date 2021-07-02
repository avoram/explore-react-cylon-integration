
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './RobotConfig.css';
import { API_ENDPOINTS } from '../../constants/constants-app';
import { get, post } from '../../services/utils';

function RobotConfig(props) {
    const [platformList, setPlatformList] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState({});
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
        console.log(event);
        setSelectedPlatform(platformList.find(ele => ele.id === event.target.value));
    }
    const addDevice = (event) => {
        console.log(props);
        setPlatformConfiguration(selectedPlatform);
        props.onRobotSelected(selectedPlatform);
    }
    const setPlatformConfiguration = (data) => {
        post(API_ENDPOINTS.ROOTURL + 'cylonRoute/setRobotConfiguration', data)
            .then((res) => res.text())
            .then((res) => console.log(res));
    }
    const onPortChange = (event) => {
        console.log(props);
        const i = platformList.findIndex(ele => ele.id === selectedPlatform.value)
        selectedPlatform.port = event;
        platformList[i] = selectedPlatform;
        setPlatformList(platformList);

    }

    return (
        <div className='robot-config'>
            <Container>
                <Row>
                    <Col xs={10} className="controls-section">
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
                            <Form.Control type="text" value={selectedPlatform.adaptor} readOnly />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Port</Form.Label>
                            <Form.Control type="text" value={selectedPlatform.port} onChange={e => onPortChange(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={2} className="buttons-section">
                        <Button onClick={addDevice} variant="primary">Add Device</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default RobotConfig;
