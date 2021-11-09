import React from 'react';
import {
    Container, Row, Col, Image
} from 'react-bootstrap';
import UserForgotPasswordForm from '../../components/UserForgotPasswordForm';

import '../../assets/css/global.scss';
import logo from '../../assets/img/logo.png';

const ForgotPassword = () => (
    <Container fluid>
        <Row>

            <Col>
                <div className="forgot-password-form-wrapper">

                    <div className="forgot-password-form">
                        <div className="logo-wrapper">
                            <Image
                                alt={`${process.env.APP_NAME}`}
                                src={logo}
                                className="forgot-logo"
                                width="240px"
                            />
                        </div>

                        <div className="form-wrapper form-forgot-password">
                            <p className="forgot-password-title">
                                FORGOT PASSWORD?
                            </p>

                            <div className="forgot-password-desc">
                                Enter your email then press &quot;Send Password Reset Link&quot;
                                and we&apos;ll send a reset email to you if you exist in the system.
                                If you do not receive the email call us to create an account.
                            </div>

                            <UserForgotPasswordForm />
                        </div>
                    </div>

                </div>
            </Col>

        </Row>
    </Container>
);

export default ForgotPassword;
