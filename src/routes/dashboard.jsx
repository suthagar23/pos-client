
import Sales from '../views/sales/sales.jsx';
import NotFound from '../views/notfound/notfound.jsx';
import Login from '../views/login/loginView.jsx';
import Logout from '../views/logout/logout.jsx';
import OrderList from '../views/orderList/orderList.jsx';
import * as constants from './routesConstants';

const dashboardRoutes = [
  {
    path: constants.PATH_AUTH,
    name: 'Login',
    icon: 'pe-7s-erro',
    component: Login
  },
  {
    path: constants.PATH_LOGOUT,
    name: 'Logout',
    icon: 'pe-7s-graph',
    component: Logout
  },
  {
    path: constants.PATH_SALES,
    name: 'Sales',
    icon: 'pe-7s-graph',
    component: Sales
  },
  {
    path: constants.PATH_ORDER_LIST,
    name: 'Order List',
    icon: 'pe-7s-graph',
    component: OrderList
  },
  {
    path: constants.PATH_404,
    name: 'Not Found',
    icon: 'pe-7s-erro',
    component: NotFound
  },
  { redirect: true, path: '/', to: constants.PATH_SALES, name: 'NotFound' }
];

export default dashboardRoutes;
