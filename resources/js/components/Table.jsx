import React from 'react';
import { Table } from 'react-bootstrap';

const TableWithStickyHead = ({ ...props }) => (
    <Table hover cellSpacing="0" cellPadding="0" size="sm" className="sticky-table-header">
        { props.children }
    </Table>
);

export default TableWithStickyHead;
