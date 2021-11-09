import Login from '../pages/login';
import Register from '../pages/register';
import ForgotPassword from '../pages/forgot-password';
import ResetPassword from '../pages/reset-password';
import Companies from '../pages/Companies';
import MyFavoriteCompanies from '../pages/MyFavoriteCompanies';
import NotFoundPage from '../pages/misc/NotFoundPage';
import MaintenancePage from '../pages/misc/MaintenancePage';

const routes = [
    {
        title: 'Login',
        path: '/login',
        exact: true,
        component: Login,
        restricted: false
    },
    {
        title: 'Register',
        path: '/register',
        exact: true,
        component: Register,
        restricted: false
    },
    {
        title: 'Forgot Password',
        path: '/forgot-password',
        component: ForgotPassword,
        restricted: false
    },
    {
        title: 'Reset Password',
        path: '/reset-password',
        component: ResetPassword,
        restricted: false
    },
    {
        title: 'Companies',
        path: '/companies',
        exact: true,
        component: Companies
    },
    {
        title: 'MyFavoriteCompanies',
        path: '/my-favorite-companies',
        exact: true,
        component: MyFavoriteCompanies
    },
    {
        title: 'Maintenance',
        path: '/maintenance',
        exact: true,
        component: MaintenancePage
    },
    {
        title: '404',
        path: '*',
        component: NotFoundPage,
        restricted: false
    }
];

export default routes;
