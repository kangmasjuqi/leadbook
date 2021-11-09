import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { sha256 } from 'js-sha256';
import { changePasswordService } from '../services/users';
import { updateAlert } from '../redux/shared/shared.action';

const UserChangePasswordModal = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retype, setRetype] = useState('');
    const [, setMatch] = useState(false);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const { onHide, show } = props;

    /**
     *
     * @param {string} key
     */
    const hasError = (key) => errors.indexOf(key) !== -1;

    /**
     * Object
     */
    const handleInputChange = (event) => {
        event.target.classList.remove('is-invalid');
    };

    /**
     *
     * @param {Object} event
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const error = [];

        if (oldPassword === '') {
            error.push('old_password');
        }

        if (newPassword === '') {
            error.push('new_password');
        }

        if (retype === '') {
            error.push('retype');
        }

        if (retype !== newPassword) {
            error.push('match');
            setMatch(false);
        } else {
            setMatch(true);
        }

        setErrors(error);

        if (error.length > 0) {
            return false;
        }

        const payload = {
            user_id: localStorage.getItem('user_id'),
            old_password: sha256(oldPassword),
            new_password: sha256(newPassword)
        };
        changePasswordService(payload).then(() => {
            onHide();
            dispatch(updateAlert({
                show: true,
                text: 'Your password has been changed.'
            }));
        }).catch(() => {
            const oldPasswordVar = document.getElementById('old-password');
            oldPasswordVar.classList.add('is-invalid');
        });
        setNewPassword('');
        setOldPassword('');
        setRetype('');
    };

    return (
        <Modal
            show={show}
            size="lg"
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-changepassword"
        >
            <Form className="modal-form modal-change-password-user">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            id="old-password"
                            defaultValue={oldPassword}
                            name="old_password"
                            onChange={(event) => {
                                setOldPassword(event.target.value);
                                handleInputChange(event);
                            }}
                            type="password"
                            placeholder="Old Password"
                            required
                            className={
                                hasError('old_password')
                                    ? 'form-control input-field input-password is-invalid'
                                    : 'form-control input-field input-password'
                            }
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={hasError('old_password') ? 'invalid-feedback' : 'hidden'}
                        >
                            Password is invalid
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Control
                            defaultValue={newPassword}
                            name="new_password"
                            onChange={(event) => {
                                handleInputChange(event);
                                setNewPassword(event.target.value);
                            }}
                            type="password"
                            placeholder="New Password"
                            required
                            className={
                                hasError('new_password')
                                    ? 'form-control input-field input-password is-invalid'
                                    : 'form-control input-field input-password'
                            }
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={hasError('new_password') ? 'invalid-feedback' : 'hidden'}
                        >
                            Password is invalid
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="retypePassword">
                        <Form.Control
                            defaultValue={retype}
                            name="retype"
                            onChange={(event) => {
                                handleInputChange(event);
                                setRetype(event.target.value);
                            }}
                            type="password"
                            required
                            placeholder="Retype Password"
                            className={
                                hasError('retype') || hasError('match')
                                    ? 'form-control input-field input-password is-invalid'
                                    : 'form-control input-field input-password'
                            }
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={hasError('retype') || hasError('match') ? 'invalid-feedback' : 'hidden'}
                        >
                            Password is invalid or do not match
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="modal-cancel-button" onClick={onHide}>Cancel</Button>
                    <Button onClick={handleSubmit} type="submit" className="modal-proceed-button">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UserChangePasswordModal;

UserChangePasswordModal.propTypes = {
    show: PropTypes.bool.isRequired
};
