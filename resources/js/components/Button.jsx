import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const ButtonSaveModal = ({ isLoading, title, ...props }) => (
    <Button
        className="modal-proceed-button"
        type="submit"
        disabled={isLoading}
        {...props}
    >
        {isLoading ? 'Saving...' : title}
    </Button>
);

export const ButtonCancelModal = ({ onClick, ...props }) => (
    <Button className="modal-cancel-button" onClick={onClick} {...props}>
        Cancel
    </Button>
);

export const ButtonAddWithIcon = ({ title, onClick, ...props }) => (
    <Button className="header-title-buttons" onClick={onClick} {...props}>
        <FontAwesomeIcon icon={faPlus} />
        &nbsp;
        { title }
    </Button>
);
