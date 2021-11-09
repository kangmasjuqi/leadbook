import React, { useState, useEffect } from 'react';
import {
    Container, Row, Form, Button, Image
} from 'react-bootstrap';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import instance from '../../services/config';
import { logInService } from '../../services/users';

import '../../assets/css/global.scss';
import logo from '../../assets/img/logo.png';

const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState(
        localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
    );
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const handleInputChange = (event) => {
        event.target.classList.remove('is-invalid');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let hasError = false;

        if (!password || password === '') {
            setErrorPassword(true);
            return;
        }

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
            email, password: sha256(password)
        };

        /**
         * @param {Object} credentials
         */
        logInService(credentials)
            .then((response) => {
                if (response.status === 200) {
                    const { token } = response.data.data;
                    const userName = response.data.data.name;
                    const userId = response.data.data.id;
                    const date = new Date();
                    const expiry = new Date();

                    expiry.setHours(expiry.getHours() + 8);

                    localStorage.setItem('token', `Bearer ${token}`);
                    localStorage.setItem('user_name', userName);
                    localStorage.setItem('user_id', userId);
                    localStorage.setItem('timestamp', date.getTime());
                    localStorage.setItem('expiry', expiry.getTime());

                    instance.defaults.headers.common.Authorization = token;
                    history.push('/companies');
                }
            }).catch((err) => {
                const { errors } = err.response.data;
                if (Object.prototype.hasOwnProperty.call(errors, 'email')) {
                    setErrorEmail(true);
                }

                if (Object.prototype.hasOwnProperty.call(errors, 'password')) {
                    setErrorPassword(true);
                }
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/companies');
        }
    }, []);

    return (
        <Container fluid className="login-page-wrapper">
            <Row className="login-page">
                <div className="login-form">

                    <div className="logo-wrapper">
                        <Image
                            alt={`${process.env.APP_NAME}`}
                            src={logo}
                            className="reset-logo"
                            width="240px"
                        />
                    </div>

                    <div className="form-wrapper">
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

                            <Form.Group controlId="password" className="control-group">
                                <label className="login-form-field-label">Password</label>
                                <Form.Control
                                    className="form-control input-field input-password login-control"
                                    name="password"
                                    value={password}
                                    onChange={(event) => {
                                        setErrorPassword(false);
                                        setPassword(event.target.value);
                                        handleInputChange(event);
                                    }}
                                    type="password"
                                    placeholder="Enter your Password"
                                    autoFocus={localStorage.getItem('email')}
                                    isInvalid={errorPassword}
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={errorEmail ? 'invalid-feedback' : 'hidden'}
                                >
                                    Incorrect Password
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button className="login-button" type="submit">LOGIN</Button>
                        </Form>
                    </div>

                    <div className="row" style={{ paddingTop: '10px', color: 'white' }}>
                        <div className="col">
                            <Link
                                className="register-link"
                                to="/register"
                                style={{ textDecoration: 'underline' }}
                            >
                                Register
                            </Link>
                        </div>
                        <div className="col text-right">
                            <Link
                                className="forgot-password-link"
                                to="/forgot-password"
                                style={{ textDecoration: 'underline' }}
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                </div>
            </Row>
        </Container>
    );
};

export default withRouter(Login);
