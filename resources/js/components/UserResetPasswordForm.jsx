import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { sha256 } from 'js-sha256';
import { resetPasswordService } from '../services/users';
import showConsoleError from '../utils/showConsoleError';
import { updateAlert } from '../redux/shared/shared.action';

const UserResetPasswordForm = () => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [retype, setRetype] = useState('');
    const [resetPasswordStatus, setResetPasswordStatus] = useState(false);

    /**
     *
     * @param {string} key
     */
    const hasError = (key) => errors.indexOf(key) !== -1;

    /**
     *
     * @param {Object} event
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const error = [];

        if (password === '') {
            error.push('password');
        }

        if (retype === '') {
            error.push('retype');
        }

        if (retype !== password) {
            error.push('match');
        }

        setErrors(error);

        if (error.length > 0) {
            return false;
        }

        const token = new URLSearchParams(window.location.search).get('token');
        const email = new URLSearchParams(window.location.search).get('email');

        localStorage.setItem('token', `Bearer ${token}`);

        const payload = {
            email,
            password: sha256(password)
        };

        resetPasswordService(payload).then(() => {
            setResetPasswordStatus(true);
            dispatch(updateAlert({
                show: true,
                text: 'Password has been updated. Please log in.'
            }));
        }).catch((err) => {
            showConsoleError(err);
        });
    };

    return (
        <>
            { !resetPasswordStatus
                ? (
                    <Form>
                        <Form.Group controlId="password" className="control-email">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className={
                                    hasError('password')
                                        ? 'form-control input-field input-password is-invalid'
                                        : 'form-control input-field input-password'
                                }
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className={
                                    hasError('password') ? 'invalid-feedback' : 'hidden'
                                }
                            >
                                Password is invalid
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="retype" className="control-email">
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control
                                className={
                                    hasError('retype') || hasError('match')
                                        ? 'form-control input-field input-password is-invalid'
                                        : 'form-control input-field input-password'
                                }
                                name="retype"
                                value={retype}
                                onChange={(event) => setRetype(event.target.value)}
                                type="password"
                                placeholder="Retype password"
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className={hasError('retype') ? 'invalid-feedback' : 'hidden'}
                            >
                                Password is invalid / do not match
                            </Form.Control.Feedback>
                        </Form.Group>
                        <p>&nbsp;</p>
                        <Button className="reset-password-button" onClick={handleSubmit} type="submit">
                            Reset Password
                        </Button>
                    </Form>
                ) : ''}
            <div className="back-login">
                <Link className="back-to-login" to="/login">
                    <Icon.ArrowLeft />
                    Login
                </Link>
            </div>
        </>
    );
};

export default withRouter(UserResetPasswordForm);
