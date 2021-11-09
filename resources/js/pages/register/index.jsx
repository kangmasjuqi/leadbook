import React, { useState } from 'react';
import {
    Container, Row, Form, Button, Image, Alert
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { createNewUserService } from '../../services/users';

import '../../assets/css/global.scss';
import logo from '../../assets/img/logo.png';

const Register = () => {
    const [email, setEmail] = useState(
        localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
    );
    const [errorEmail, setErrorEmail] = useState(false);
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);

    const handleInputChange = (event) => {
        event.target.classList.remove('is-invalid');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let hasError = false;

        const expression = /\S+@\S+\.\S+/;
        const validEmail = expression.test(String(email).toLowerCase());

        if (!validEmail || !email || email === '') {
            setErrorEmail(true);
            hasError = true;
        }

        // Exits the function if an error in the email or password field exists
        if (hasError) {
            return;
        }

        const credentials = {
            email, name: fullname, phone_number: phoneNumber
        };

        /**
         * @param {Object} credentials
         */
        createNewUserService(credentials)
            .then((response) => {
                if (response.status === 200) {
                    setRegisterStatus(true);
                }
            }).catch((err) => {
                const { errors } = err.response.data;
                if (Object.prototype.hasOwnProperty.call(errors, 'email')) {
                    setErrorEmail(true);
                }
            });
    };

    return (
        <Container fluid className="login-page-wrapper">
            <Row className="login-page">
                <div className="login-form">

                    <div className="logo-wrapper">
                        <Image
                            alt={`${process.env.APP_NAME}`}
                            src={logo}
                            className="register-logo"
                            width="240px"
                        />
                    </div>

                    <div className="form-wrapper">

                        { !registerStatus
                            ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email" className="control-group">
                                        <label className="login-form-field-label">Email/Username</label>
                                        <Form.Control
                                            className="form-control input-field input-email login-control"
                                            name="email"
                                            type="email"
                                            value={email}
                                            placeholder="Enter your Email Address as Username"
                                            onChange={(event) => {
                                                setErrorEmail(false);
                                                handleInputChange(event);
                                                setEmail(event.target.value);
                                            }}
                                            autoFocus={!localStorage.getItem('email')}
                                            isInvalid={errorEmail}
                                        />
                                        <Form.Control.Feedback type="invalid" className={errorEmail ? 'invalid-feedback' : 'hidden'}>
                                            This Email Address is invalid or not registered
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="fullname" className="control-group">
                                        <label className="login-form-field-label">Full Name</label>
                                        <Form.Control
                                            className="form-control input-field input-fullname login-control"
                                            name="fullname"
                                            type="text"
                                            value={fullname}
                                            placeholder="Full Name"
                                            onChange={(event) => {
                                                handleInputChange(event);
                                                setFullname(event.target.value);
                                            }}
                                            autoFocus={!localStorage.getItem('fullname')}
                                            isInvalid={errorEmail}
                                        />
                                        <Form.Control.Feedback type="invalid" className={errorEmail ? 'invalid-feedback' : 'hidden'}>
                                            This Email Address is invalid
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="phone_number" className="control-group">
                                        <label className="login-form-field-label">Phone Number</label>
                                        <Form.Control
                                            className="form-control input-field input-phone_number login-control"
                                            name="phone_number"
                                            type="text"
                                            value={phoneNumber}
                                            placeholder="Phone Number"
                                            onChange={(event) => {
                                                handleInputChange(event);
                                                setPhoneNumber(event.target.value);
                                            }}
                                            autoFocus={!localStorage.getItem('phone_number')}
                                            isInvalid={errorEmail}
                                        />
                                        <Form.Control.Feedback type="invalid" className={errorEmail ? 'invalid-feedback' : 'hidden'}>
                                            This Phone Number is invalid
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button className="login-button" type="submit">REGISTER</Button>
                                </Form>
                            ) : (
                                <div className="row" style={{ paddingTop: '10px', color: 'white' }}>
                                    <div className="col-12">
                                        <Alert variant="success" className="alert-success-send-email">
                                            {
                                                `
                                                    Email sent to ${email}, 
                                                    please check your inbox for verify email 
                                                    & set password
                                                `
                                            }
                                        </Alert>
                                    </div>
                                </div>
                            )}
                        <div className="row" style={{ paddingTop: '10px', color: 'white' }}>
                            <div className="col-12 text-right">
                                <Link
                                    className="forgot-password-link"
                                    to="/login"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </Row>
        </Container>
    );
};

export default withRouter(Register);
