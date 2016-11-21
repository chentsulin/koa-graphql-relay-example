import 'babel-polyfill';
import 'todomvc-common';

import React from 'react';
import { render } from 'react-dom';
import { RootContainer } from 'react-relay';
import TodoApp from './components/TodoApp';
import AppHomeRoute from './routes/AppHomeRoute';

render(
  <RootContainer
    Component={TodoApp}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root'),
);
