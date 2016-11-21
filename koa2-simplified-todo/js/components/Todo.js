import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';

class Todo extends React.Component {
  handleCompleteChange = (e) => {
    const complete = e.target.checked;
    this.props.relay.commitUpdate(
      new ChangeTodoStatusMutation({
        complete,
        todo: this.props.todo,
        viewer: this.props.viewer,
      }),
    );
  };

  handleDestroyClick = () => {
    this.removeTodo();
  };

  removeTodo() {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ todo: this.props.todo, viewer: this.props.viewer })
    );
  }

  render() {
    return (
      <li
        className={classnames({
          completed: this.props.todo.complete,
        })}
      >
        <div className="view">
          <input
            checked={this.props.todo.complete}
            className="toggle"
            onChange={this.handleCompleteChange}
            type="checkbox"
          />
          <label>{this.props.todo.text}</label>
          <button
            className="destroy"
            onClick={this.handleDestroyClick}
          />
        </div>
      </li>
    );
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${ChangeTodoStatusMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `,
  },
});
