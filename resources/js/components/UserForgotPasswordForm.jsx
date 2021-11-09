import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { sendResetPasswordLinkService } from '../services/users';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [resetLink, setResetLink] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

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

        const expression = /\S+@\S+\.\S+/;
        const validEmail = expression.test(String(email).toLowerCase());

        if (!validEmail) {
            error.push('email');
        }

        setErrors(error);

        if (error.length > 0) {
            return false;
        }

        const payload = {
            email
        };

        sendResetPasswordLinkService(payload).then((response) => {
            if (response.status === 200) {
                setSuccess(true);
                setResetLink(response.data.data.reset_link);
            } else {
                throw new Error();
            }
        }).catch(() => {
            const emails = document.getElementsByClassName('input-email');
            emails[0].classList.add('is-invalid');
        });
    };

    return (
        <Form>
            <Form.Group controlId="email" className="control-group" style={{ margin: '20px 0px' }}>
                <label className="forgot-password-form-field-label">Email Address</label>
                <Form.Control
                    className={
                        hasError('email')
                            ? 'form-control input-field input-email is-invalid'
                            : 'form-control input-field input-email login-control'
                    }
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Enter your Email Address"
                    style={{ color: 'black' }}
                />
                <Form.Control.Feedback
                    type="invalid"
                    className={hasError('email') ? 'invalid-feedback' : 'hidden'}
                >
                    This Email Address is invalid or not registered
                </Form.Control.Feedback>
            </Form.Group>

            { success === true
                ? (
                    <Alert variant="success" className="alert-success-send-email">
                        {
                            `
                                Email sent to ${email}, please check your inbox 
                                for reset password : ${resetLink}
                            `
                        }
                    </Alert>
                )
                : ''}

            <Button className="forgot-password-button" onClick={handleSubmit} type="submit">
                Send Password Reset Link
            </Button>
            <div className="back-login">
                <Link className="back-to-login" to="/login">
                    <Icon.ArrowLeft />
                    Back to Login
                </Link>
            </div>
        </Form>
    );
};

export default ForgotPassword;
