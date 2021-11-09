import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faHeart } from '@fortawesome/free-solid-svg-icons';

// Component
import TableSortable from '../components/TableSortable';

// Import Redux
import { markAsFavorite, unmarkAsFavorite } from '../redux/leadbook/leadbook.action';

const CompaniesTable = ({
    isLoading, data, getListDataDispatch, mode
}) => {
    const dispatch = useDispatch();

    // const [showEditModal, setShowEditModal] = useState(false);
    // const [editValue, setEditValue] = useState(null);
    // const [isEditLoading, setIsEditLoading] = useState(false);

    const userId = 1; // TODO : must be fetched from localStorage

    const unmarkAsFavoriteDispatch = (companyId) => {
        const payload = {
            company_id: companyId
        };
        dispatch(unmarkAsFavorite(payload)).then((res) => {
            if (res.status === 200) {
                getListDataDispatch();
            }
        });
    };

    const markAsFavoriteDispatch = (companyId) => {
        const payload = {
            company_id: companyId
        };
        dispatch(markAsFavorite(payload)).then((res) => {
            if (res.status === 200) {
                getListDataDispatch();
            }
        });
    };

    const handleMarkAsFavorite = (companyId) => {
        markAsFavoriteDispatch(companyId);
    };

    const handleUnmarkAsFavorite = (companyId) => {
        unmarkAsFavoriteDispatch(companyId);
    };

    const companiesData = (sortableItems) => (
        sortableItems.map((value) => (
            <tr key={value.company_name}>
                <td>
                    { value.company_name }
                </td>
                <td>
                    { value.phone_number }
                </td>
                <td>
                    { value.address }
                </td>
                {mode === 'favorite' ? <td>Favorited</td> : null}
                {
                    mode !== 'favorite'
                        ? (
                            <td>
                                { value.is_favorited === 1
                                    ? (
                                        <Button className="modal-cancel-button" onClick={() => handleUnmarkAsFavorite(value.id)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                            &nbsp;
                                            Unmark as Favorite
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleMarkAsFavorite(value.id)}>
                                            <FontAwesomeIcon icon={faHeart} />
                                            &nbsp;
                                            Mark as Favorite
                                        </Button>
                                    )}
                            </td>
                        ) : null
                }
            </tr>
        ))
    );

    // const handleEditUser = (value) => {
    //     setIsEditLoading(true);
    //     const payload = {
    //         user_name: value.username,
    //         phone: value.phone,
    //         is_admin: value.is_admin,
    //         is_active: value.is_active,
    //         role_id: value.roleId
    //     };

    //     dispatch(edituser(payload, value.id)).then((res) => {
    //         if (res.status === 200) {
    //             getUsersDispatch();
    //             hideModal();
    //             setIsEditLoading(false);
    //         }
    //     });
    // };

    const header = [
        { fieldLabel: 'Company name', sortByFieldName: 'company_name', columnClassName: '' },
        { fieldLabel: 'Phone No.', sortByFieldName: 'phone_number', columnClassName: '' },
        { fieldLabel: 'Address', sortByFieldName: 'address', columnClassName: '' },
        { fieldLabel: 'Status', columnClassName: '' }
    ];

    return (
        <div>
            <TableSortable
                header={header}
                data={data}
                dataPrinter={companiesData}
                modal={null}
                isLoading={isLoading}
                actionCols="hide"
            />
        </div>
    );
};

export default CompaniesTable;
