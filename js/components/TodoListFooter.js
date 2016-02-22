import {IndexLink, Link} from 'react-router';
import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation';

import React from 'react';
import Relay from 'react-relay';

class TodoListFooter extends React.Component {
  _handleRemoveCompletedTodosClick = () => {
    Relay.Store.update(
      new RemoveCompletedTodosMutation({
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    );
  };
  render() {
    var numCompletedTodos = this.props.viewer.completedCount;
    var numRemainingTodos = this.props.viewer.totalCount - numCompletedTodos;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numRemainingTodos}</strong> item{numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className="filters">
          <li>
            <IndexLink to="/" activeClassName="selected">All</IndexLink>
          </li>
          <li>
            <Link to="/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
        {numCompletedTodos > 0 &&
          <button
            className="clear-completed"
            onClick={this._handleRemoveCompletedTodosClick}>
            Clear completed
          </button>
        }
      </footer>
    );
  }
}

export default Relay.createContainer(TodoListFooter, {
  prepareVariables() {
    return {
      limit: 2147483647,  // GraphQLInt
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        todos(status: "completed", first: $limit) {
          ${RemoveCompletedTodosMutation.getFragment('todos')},
        },
        totalCount,
        ${RemoveCompletedTodosMutation.getFragment('viewer')},
      }
    `,
  },
});
