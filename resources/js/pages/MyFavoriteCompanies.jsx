import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Row
} from 'react-bootstrap';

// Import Redux
import { getMyFavoriteCompanies } from '../redux/leadbook/leadbook.action';

// import Component
import MainMenu from '../components/Navbar';
import CustomAlert from '../components/CustomAlert/CustomAlert';

import CompaniesTable from './CompaniesTable';

const MyFavoriteCompanies = () => {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);

    const [isLoading, setIsLoading] = useState(false);
    const [dataFavoriteCompanies, setDataFavoriteCompanies] = useState([]);

    const getMyFavoriteCompaniesDispatch = () => {
        setIsLoading(true);
        dispatch(getMyFavoriteCompanies()).then((res) => {
            if (res.status === 200) {
                setIsLoading(false);
                setDataFavoriteCompanies(res.data.data);
            }
        });
    };

    useEffect(() => {
        getMyFavoriteCompaniesDispatch();
    }, []);

    return (
        <Container fluid className="manage-params-page-wrapper">
            <Row className="manage-params-page">
                <MainMenu />
            </Row>

            <div className="function-content">
                <Row className="function-header">
                    <div>
                        <span className="page-title">
                            My Favorite Companies
                        </span>
                    </div>
                </Row>

                <Row className="table-content manage-params-wrapper">
                    <div className="table-params manage-params">
                        <CompaniesTable
                            isLoading={isLoading}
                            data={dataFavoriteCompanies}
                            getListDataDispatch={getMyFavoriteCompaniesDispatch}
                            mode="favorite"
                        />
                    </div>
                </Row>

            </div>
            <CustomAlert />
        </Container>
    );
};

export default MyFavoriteCompanies;
