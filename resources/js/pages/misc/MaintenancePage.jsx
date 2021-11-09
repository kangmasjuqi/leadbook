import React from 'react';
import {
    Container, Row, Col
} from 'react-bootstrap';

const MaintenancePage = () => (
    <Container>
        <Row>
            <Col>
                <div className="maintenance-page-wrapper">
                    <article>
                        <h1>We&rsquo;ll be back soon!</h1>
                        <div>
                            <p>
                                Sorry for the inconvenience but we&rsquo;re
                                performing some maintenance at the moment.
                                We&rsquo;ll be back online shortly!
                            </p>
                            <p>&mdash; The Team</p>
                        </div>
                    </article>
                </div>
            </Col>
        </Row>
    </Container>
);
export default MaintenancePage;
