
import Dashboard from '../views/dashboard/dashboard.jsx';
import NotFound from '../views/notfound/notfound.jsx';
import Login from '../views/login/loginView.jsx';
import * as constants from './routesConstants';

const dashboardRoutes = [
  {
    path: constants.PATH_AUTH,
    name: 'Login',
    icon: 'pe-7s-erro',
    component: Login
  },
  {
    path: constants.PATH_DASHBOARD,
    name: 'Dashboard',
    icon: 'pe-7s-graph',
    component: Dashboard
  },
  {
    path: constants.PATH_404,
    name: 'Not Found',
    icon: 'pe-7s-erro',
    component: NotFound
  },
  { redirect: true, path: '/', to: constants.PATH_404, name: 'NotFound' }
];

export default dashboardRoutes;
