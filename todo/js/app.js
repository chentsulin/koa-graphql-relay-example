import 'todomvc-common';

import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import { createHashHistory } from 'history';
import { IndexRoute, Route, Router, applyRouterMiddleware, useRouterHistory } from 'react-router';
import useRelay from 'react-router-relay';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const mountNode = document.getElementById('root');

render(
  <Router
    environment={Relay.Store}
    history={history}
    render={applyRouterMiddleware(useRelay)}>
    <Route path="/"
      component={TodoApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={TodoList}
        queries={ViewerQueries}
        prepareParams={() => ({ status: 'any' })}
      />
      <Route path=":status"
        component={TodoList}
        queries={ViewerQueries}
      />
    </Route>
  </Router>,
  mountNode
);
