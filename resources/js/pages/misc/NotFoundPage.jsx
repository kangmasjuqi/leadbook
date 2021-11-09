import React from 'react';
import {
    Container, Row, Col
} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

const NotFoundPage = () => (
    <Container>
        <Row>
            <Col>
                <div className="not-found-wrapper">
                    <img src={logo} alt={`${process.env.APP_NAME}`} />
                    <h1>
                        404
                    </h1>
                    <p>We are sorry, but the page you requested was not found.</p>
                </div>
            </Col>
        </Row>
    </Container>
);
export default NotFoundPage;
