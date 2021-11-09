import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Container, Row, Col, Form
} from 'react-bootstrap';

// Import Redux
import { getCompanies } from '../redux/leadbook/leadbook.action';

// import Component
import MainMenu from '../components/Navbar';
import SearchComponent from '../components/Search';
import CustomAlert from '../components/CustomAlert/CustomAlert';

import CompaniesTable from './CompaniesTable';

const Companies = () => {
    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = useState('');
    const [filterSearch, setFilterSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dataCompanies, setDataCompanies] = useState([]);

    const getCompaniesDispatch = () => {
        setIsLoading(true);
        const payload = { search: filterSearch };
        dispatch(getCompanies(payload)).then((res) => {
            if (res.status === 200) {
                setIsLoading(false);
                setDataCompanies(res.data.data);
            }
        });
    };

    useEffect(() => {
        getCompaniesDispatch();
    }, [filterSearch]);

    const handleSearchChange = (search) => {
        setFilterSearch(search);
    };

    const handleKeyDown = (event) => {
        event.preventDefault();
        handleSearchChange(event.target.value);
    };

    return (
        <Container fluid className="manage-params-page-wrapper">
            <Row className="manage-params-page">
                <MainMenu />
            </Row>

            <div className="function-content">
                <Row className="function-header">
                    <div>
                        <span className="page-title">
                            Companies
                        </span>
                    </div>
                </Row>

                <Row className="table-action-wrapper">
                    <div className="table-action">
                        <Form>
                            <Col className="search-input-action">
                                <SearchComponent
                                    onKeyPress={handleKeyDown}
                                    onChange={setSearchKey}
                                    onClick={handleSearchChange}
                                    searchKey={searchKey}
                                />
                            </Col>

                        </Form>
                    </div>
                </Row>

                <Row className="table-content manage-params-wrapper">
                    <div className="table-params manage-params">
                        <CompaniesTable
                            isLoading={isLoading}
                            data={dataCompanies}
                            getListDataDispatch={getCompaniesDispatch}
                            mode="search"
                        />
                    </div>
                </Row>

            </div>
            <CustomAlert />
        </Container>
    );
};

export default Companies;
