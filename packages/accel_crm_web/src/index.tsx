import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
const pkg = require('../package.json');

import { store } from './redux';
import { ReduxDevTools, Navbar, Icon, Hero, Loader } from './components';
import views from './views';
import * as views1 from './views';

import ErrorView from './views/Error';
import './scss/style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'antd/dist/antd.css';
import Login from './views/login';

import { checkAuth, getJWT, setAuthHeader } from './actions/auth';
import { appLoaded } from './actions/app';

ReactGA.initialize('UA-140700677-1');
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);
let viewsAccess = null;

(async () => {
  // const [token, setToken] = React.useState(null);
  try {
    const jwt = await store.dispatch(getJWT());
    if (jwt) {
      await store.dispatch(setAuthHeader(jwt));
      let result = await store.dispatch(checkAuth());
      store.dispatch(appLoaded());
      if (result)
        viewsAccess = await views1.getAccess(store.dispatch);
    } else {
      store.dispatch(appLoaded());
      if (!await store.dispatch(getJWT()) && window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }
  } catch (e) {
    render(
      <Hero className="is-fullheight-with-navbar">
        <div className="container">
          <div className="content">
            <h3 className="has-text-danger">
              <Icon iconName="exclamation-circle" /> {process.env.APP_NAME} is
              Offline
            </h3>
            <p>There was a problem connecting to {process.env.APP_NAME}.</p>
            <p>We apologise for any inconvenience caused.</p>
          </div>
          <div className="buttons">
            <a href="/" target="_self" className="button">
              <Icon iconName="refresh" />
              <span>Reload</span>
            </a>
          </div>
        </div>
      </Hero>,
      document.getElementById('app'),
    );
    return;
  }

  render(
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Helmet titleTemplate={`%s | ${process.env.APP_NAME}`} />
          <Navbar
            routes={
              <Switch>
                {viewsAccess && viewsAccess.map((view) => (
                  <Route
                    exact
                    key={view.path}
                    path={view.path}
                    component={view.component}
                  />
                ))}
                {views.map((view) => (
                  <Route
                    exact
                    key={view.path}
                    path={view.path}
                    component={view.component}
                  />
                ))}
                <Route component={ErrorView} />
              </Switch>
            }
          />
          {process.env.NODE_ENV === 'development' && <ReduxDevTools />}
        </>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
})();
