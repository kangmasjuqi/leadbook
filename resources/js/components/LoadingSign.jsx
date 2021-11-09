import React from 'react';
import spinner from '../assets/icons/spinner.svg';

const LoadingSign = ({ type }) => {
    const signInTableRow = (
        <tr>
            <td className="loading-row" colSpan="6">
                <p>
                    <span className="loader"><img src={spinner} alt="Loading..." /></span>
                </p>
                <p className="loading-text">Loading...</p>
            </td>
        </tr>
    );
    const signInDiv = (
        <div style={{ width: '100%' }}>
            <span className="loader"><img src={spinner} alt="Loading..." /></span>
            <p className="loading-text">Loading...</p>
        </div>
    );

    return type === 'tableRow' ? signInTableRow : signInDiv;
};

export default LoadingSign;
