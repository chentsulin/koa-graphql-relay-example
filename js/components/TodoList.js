import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';

import React from 'react';
import Relay from 'react-relay';

class TodoList extends React.Component {
  _handleMarkAllChange = (e) => {
    var complete = e.target.checked;
    Relay.Store.update(
      new MarkAllTodosMutation({
        complete,
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    );
  };
  renderTodos() {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />
    );
  }
  render() {
    var numTodos = this.props.viewer.totalCount;
    var numCompletedTodos = this.props.viewer.completedCount;
    return (
      <section className="main">
        <input
          checked={numTodos === numCompletedTodos}
          className="toggle-all"
          onChange={this._handleMarkAllChange}
          type="checkbox"
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    status: null,
  },

  prepareVariables({status}) {
    var nextStatus;
    if (status === 'active' || status === 'completed') {
      nextStatus = status;
    } else {
      // This matches the Backbone example, which displays all todos on an
      // invalid route.
      nextStatus = 'any';
    }
    return {
      status: nextStatus,
      limit: 2147483647,  // GraphQLInt
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        todos(status: $status, first: $limit) {
          edges {
            node {
              id,
              ${Todo.getFragment('todo')},
            },
          },
          ${MarkAllTodosMutation.getFragment('todos')},
        },
        totalCount,
        ${MarkAllTodosMutation.getFragment('viewer')},
        ${Todo.getFragment('viewer')},
      }
    `,
  },
});
