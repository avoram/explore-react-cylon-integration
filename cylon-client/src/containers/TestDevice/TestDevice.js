
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../constants/constants-app';
import { get, post } from '../../services/utils';

function TestDevice(props) {
    const [apiResponse, setApiResponse] = useState('');
    const { deviceDetails } = props;
    React.useEffect(() => {
        async function setConfiguration() {
            const payload = { 'robot': props.robotSelected, 'device': props.deviceSelected };
            post(API_ENDPOINTS.ROOTURL + 'cylonRoute/setRobotConfiguration', payload)
                .then((res) => setApiResponse(res.text()))
                .then((res) => console.log(res));
        }
        setConfiguration();
    }, []);
    const startLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/startLED')
            .then((res) => res.text())
            .then((res) => setApiResponse(res));
    };
    const stopLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/stopLED')
            .then((res) => res.text())
            .then((res) => setApiResponse(res));
    };

    const setPlatformConfiguration = (data) => {
        post(API_ENDPOINTS.ROOTURL + 'cylonRoute/setRobotConfiguration', data)
            .then((res) => res.text())
            .then((res) => console.log(res));
    }

    const ledTestPage = () => {
        return (
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Button variant='success' onClick={startLED}>
                        Start the LED
                    </Button>
                    <Button variant='danger' onClick={stopLED}>
                        Stop the LED
                    </Button>
                </Col>
                <Col xs={6}>
                    {apiResponse === 'OK' ? 'LED Configuration Successful!' : 'LED Configuration Failed!'}
                </Col>
            </Row>
        )
    }
    let renderPage;
    if (props.deviceSelected.id === 'led') {
        renderPage = ledTestPage();
    }
    return (
        <div className='robot-config'>
            <Container>
                {/* <Button variant='primary' onClick={setLEDConfiguration}>
                        Configure LED
                    </Button> */}
                {renderPage}
            </Container>
        </div>
    );
}


export default TestDevice;
