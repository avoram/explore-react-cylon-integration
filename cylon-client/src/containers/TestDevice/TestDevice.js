
import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../constants/constants-app';
import { get, post } from '../../services/utils';

function TestDevice(props) {
    const [apiResponse, setApiResponse] = useState('');
    const { robotSelected, deviceSelected } = props;
    React.useEffect(() => {
        async function setConfiguration() {
            const payload = { 'robot': robotSelected, 'device': deviceSelected };
            post(API_ENDPOINTS.ROOTURL + 'cylonRoute/setRobotConfiguration', payload)
                .then((res) => res.json())
                .then((res) => setApiResponse(res));
        }
        setConfiguration();
    }, []);
    const startLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/startLED')
            .then((res) => res.text());
    };
    const stopLED = () => {
        fetch(API_ENDPOINTS.ROOTURL + 'cylonRoute/stopLED')
            .then((res) => res.text());
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
                    {apiResponse === '' ? 'Processing...' : (apiResponse.statusCode === 'OK' ? 'Configuration Successful!' : ('Configuration Failed ==> ' + apiResponse.statusMessage))}
                </Col>
            </Row>
        )
    }
    let renderPage;
    // if (props.deviceSelected.id === 'led') {
    renderPage = ledTestPage();
    // }
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
