import React from 'react';
import Relay from 'react-relay';

import Todo from './Todo';

class TodoList extends React.Component {
  renderTodos() {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />,
    );
  }

  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(TodoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(
          first: 2147483647  # max GraphQLInt
        ) {
          edges {
            node {
              id,
              ${Todo.getFragment('todo')},
            },
          },
        },
        ${Todo.getFragment('viewer')},
      }
    `,
  },
});
