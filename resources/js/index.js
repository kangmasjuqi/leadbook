import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/global.scss';
import {
    BrowserRouter as Router,
    Switch, Redirect
} from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import { store } from './redux/store';

import ProgressRoute from './routes/ProgressRoute';

import routes from './routes';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Redirect from="/" to="/login" exact />
                {routes.map((route) => <ProgressRoute key={route.title} {...route} />)}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
