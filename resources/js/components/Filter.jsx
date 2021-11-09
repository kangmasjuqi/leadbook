import React from 'react';
import { Form } from 'react-bootstrap';

const FilterSelect = ({
    onChange,
    value,
    ...props
}) => (
    <Form.Group controlId="filter-states-distribution">
        <Form.Control as="select" onChange={onChange} value={value}>
            { props.children }
        </Form.Control>
    </Form.Group>
);

export default FilterSelect;
