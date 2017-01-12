// @flow
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Application from 'containers/Application';
import Index from 'containers/Index';

const routes = (
  <Route path="/" component={Application}>
    <IndexRoute component={Index} />
  </Route>
);

const Routes = (props: { history: Object }): ElementType => {
  return (
    <Router history={props.history}>
      {routes}
    </Router>
  );
};

export default Routes;
