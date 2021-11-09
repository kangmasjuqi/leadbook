import React from 'react';
import {
    Container, Row, Col, Image
} from 'react-bootstrap';
import UserResetPasswordForm from '../../components/UserResetPasswordForm';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import '../../assets/css/global.scss';
import logo from '../../assets/img/logo.png';

const ResetPassword = () => (
    <Container fluid>
        <Row>

            <Col>
                <div className="forgot-password-form-wrapper">

                    <div className="reset-password-form">
                        <div className="logo-wrapper">
                            <Image
                                alt={`${process.env.APP_NAME}`}
                                src={logo}
                                className="reset-logo"
                                width="240px"
                            />
                        </div>

                        <div
                            className="form-wrapper"
                            style={{
                                background: 'white',
                                padding: '40px',
                                borderRadius: '40px'
                            }}
                        >
                            <p className="reset-password-title">
                                RESET PASSWORD
                            </p>

                            <UserResetPasswordForm />
                        </div>
                    </div>

                </div>
            </Col>

        </Row>

        <CustomAlert />
    </Container>
);

export default ResetPassword;
