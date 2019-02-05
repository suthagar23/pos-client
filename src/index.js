
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import indexRoutes from './routes/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/light-bootstrap.css?v=1.3.0';
import 'font-awesome/css/font-awesome.min.css';

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        {indexRoutes.map((prop, key) => <Route to={prop.path} component={prop.component} key={key}/>)}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
