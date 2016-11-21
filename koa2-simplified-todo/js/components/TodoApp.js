import React from 'react';
import Relay from 'react-relay';

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

class TodoApp extends React.Component {
  handleTextInputSave = (text) => {
    this.props.relay.commitUpdate(
      new AddTodoMutation({ text, viewer: this.props.viewer })
    );
  };

  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
            <TodoTextInput
              autoFocus
              className="new-todo"
              onSave={this.handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>

          <TodoList viewer={this.props.viewer} />

          {hasTodos &&
            <TodoListFooter
              todos={this.props.viewer.todos}
              viewer={this.props.viewer}
            />
          }
        </section>
        <footer className="info">
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        ${TodoList.getFragment('viewer')},
        ${TodoListFooter.getFragment('viewer')},
        ${AddTodoMutation.getFragment('viewer')},
      }
    `,
  },
});
