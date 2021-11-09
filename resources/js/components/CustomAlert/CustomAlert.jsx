import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck, faExclamation, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { updateAlert } from '../../redux/shared/shared.action';
import alertTypes from '../../constants/alertTypes';

/**
 * Displays an alert, the alert data is updated through redux
 * alert: {
 *   show: boolean,
 *   title: string,
 *   text: string,
 *   type: string [ options -> 'primary' | 'success' | 'warning' | 'error' ]
 * }
 * @returns {React.component}
 */
const CustomAlert = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.shared.alert);
    if (!alert || !alert?.show) {
        return null;
    }
    return (
        <div className="overlay-alert-custom">
            <Alert
                className="alert-dismissable-custom"
                variant={alert.type}
                show={alert?.show}
                onClose={() => dispatch(updateAlert({ ...alert, show: false }))}
            >
                <Alert.Heading>
                    <IconType type={alert?.type} />
                    <span style={{ paddingLeft: '12px' }}>{alert?.title}</span>
                </Alert.Heading>
                <p>
                    {alert?.text}
                </p>
                <div className="d-flex justify-content-end">
                    <Button
                        className="btn-footer"
                        onClick={() => dispatch(updateAlert({ ...alert, show: false }))}
                        variant={alert.type === alertTypes.error ? 'danger' : alert.type}
                    >
                        Ok
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

const IconType = ({ type }) => {
    if (type === alertTypes.error) {
        return <FontAwesomeIcon icon={faTimes} />;
    } else if (type === alertTypes.success) {
        return <FontAwesomeIcon icon={faCheck} />;
    } else if (type === alertTypes.warning) {
        return <FontAwesomeIcon icon={faExclamation} />;
    }
    return null;
};

export default CustomAlert;
