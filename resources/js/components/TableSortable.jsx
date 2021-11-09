import React from 'react';
import { Table } from 'react-bootstrap';
import LoadingSign from './LoadingSign';
import SortingData from './SortingData';

const TableSortable = ({
    header, data, dataPrinter, modal, isLoading, actionCols = 'show'
}) => {
    const { items, requestSort, sortConfig } = SortingData(data);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const printSortableHeader = () => header.map((value) => {
        let column = '';
        if (!('sortByFieldName' in value)) {
            column = (
                <th key={value.fieldLabel} className={value.columnClassName}>
                    {value.fieldLabel}
                </th>
            );
        } else {
            column = (
                <th key={value.fieldLabel} className={value.columnClassName}>
                    <span
                        onClick={() => requestSort(value.sortByFieldName)}
                        className={getClassNamesFor(value.sortByFieldName)}
                        style={{ cursor: 'pointer' }}
                    >
                        {value.fieldLabel}
                    </span>
                </th>
            );
        }
        return column;
    });

    return (
        <Table hover cellSpacing="0" cellPadding="0" size="sm" className="sticky-table-header">
            <thead className="sortable-heads">
                <tr>
                    { printSortableHeader() }
                    {
                        actionCols !== 'hide'
                            ? <th className="column-center">Action</th> : null
                    }
                </tr>
            </thead>
            <tbody>
                { isLoading ? <LoadingSign type="tableRow" /> : dataPrinter(items, modal) }
            </tbody>
        </Table>
    );
};

export default TableSortable;
