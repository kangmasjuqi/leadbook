import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserChangePasswordModal from './UserChangePasswordModal';

const MainMenu = () => {
    const history = useHistory();

    const [show, setShow] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('timestamp');
        localStorage.removeItem('expiry');
    };

    const openChangePasswordModal = () => {
        setShow(true);
    };

    const closeChangePasswordModal = () => {
        setShow(false);
    };

    const username = localStorage.getItem('user_name');

    let abbv;
    if (username !== null) {
        const split = username.split(' ');
        const firstLetter = split[0];

        let lastLetter = '';

        if (split.length > 1) {
            lastLetter = split[1];
        }

        abbv = firstLetter.charAt(0) + lastLetter.charAt(0);
    } else {
        history.push('/');
    }

    return (
        <>
            <Navbar className="main-menu" expand="lg">
                <Navbar.Brand href="/companies">
                    [logo]
                </Navbar.Brand>
                <Navbar.Brand href="/companies">
                    COMPANIES
                </Navbar.Brand>
                <Navbar.Brand href="/my-favorite-companies">
                    My FAVORITE COMPANIES
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" />
                    <Nav className="menu-right">

                        <NavDropdown
                            className="menu-dropdown menu-dropdown-profile"
                            title={(
                                <div className="user-image-navbar">
                                    <div className="abbv abbv2">{abbv}</div>
                                </div>
                            )}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item className="profile-details" href="#">
                                <div className="user-image-dropdown">
                                    <div className="abbv abbv2">{abbv}</div>
                                </div>
                                <div className="details">
                                    <span className="name">{username}</span>
                                    <span className="roles">
                                        User
                                    </span>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={openChangePasswordModal}
                                className="dropdown-item-profile"
                                href="#change-password"
                            >
                                Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item-profile" as={Link} to="/login" onClick={logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <UserChangePasswordModal show={show} onHide={closeChangePasswordModal} />
        </>
    );
};

export default MainMenu;
