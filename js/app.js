import 'babel/polyfill';
import 'todomvc-common';
import { createHashHistory } from 'history';
import { IndexRoute, Route } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import { RelayRouter } from 'react-router-relay';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

render(
  <RelayRouter history={createHashHistory({ queryKey: false })}>
    <Route
      path="/" component={TodoApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={TodoList}
        queries={ViewerQueries}
        prepareParams={() => ({ status: 'any' })}
      />
      <Route
        path=":status" component={TodoList}
        queries={ViewerQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
