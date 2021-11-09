import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import './progress-route.css';

class ProgressRoute extends React.Component {
    constructor(props) {
        super(props);
        nprogress.start();
    }

    componentDidMount() {
        nprogress.done();
        const expiry = localStorage.getItem('expiry');
        const date = new Date();
        const now = date.getTime();
        const {
            title, history, restricted
        } = this.props;

        if (now > expiry
            && title !== 'Forgot Password'
            && title !== 'Reset Password'
            && title !== 'Register'
        ) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_name');
            localStorage.removeItem('timestamp');
            localStorage.removeItem('expiry');
            history.push('/login');
        }

        if (restricted === true && !localStorage.getItem('token')) {
            history.push('/login');
        }
    }

    render() {
        return (
            <Route {...this.props} />
        );
    }
}

export default withRouter(ProgressRoute);
