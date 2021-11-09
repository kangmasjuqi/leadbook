import React from 'react';
import { Pagination } from 'react-bootstrap';
import arrowLeft from '../assets/icons/ic_pages_back.svg';
import arrowFirst from '../assets/icons/ic_pages_mostback.svg';
import arrowNext from '../assets/icons/ic_pages_next.svg';
import arrowLast from '../assets/icons/ic_pages_mostnext.svg';

const Paging = () => (
    <Pagination>
        <Pagination.Item className="first">
            <img alt="First" src={arrowFirst} />
        </Pagination.Item>

        <Pagination.Item className="prev">
            <img alt="Prev" src={arrowLeft} />
        </Pagination.Item>

        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>

        <Pagination.Item className="next">
            <img alt="Next" src={arrowNext} />
        </Pagination.Item>

        <Pagination.Item className="last">
            <img alt="Last" src={arrowLast} />
        </Pagination.Item>

    </Pagination>
);

export default Paging;
