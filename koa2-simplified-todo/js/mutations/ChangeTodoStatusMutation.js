import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id
      }
    `,
    // TODO: Mark completedCount optional
    viewer: () => Relay.QL`
      fragment on User {
        id
        completedCount
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { changeTodoStatus }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangeTodoStatusPayload @relay(pattern: true) {
        todo {
          complete
        }
        viewer {
          completedCount
          todos
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        viewer: this.props.viewer.id,
      },
    }];
  }

  getVariables() {
    return {
      complete: this.props.complete,
      id: this.props.todo.id,
    };
  }
}
