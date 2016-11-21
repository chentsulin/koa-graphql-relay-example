import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
        totalCount
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { addTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload @relay(pattern: true) {
        todoEdge
        viewer {
          todos
          totalCount
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: () => 'append',
    }];
  }

  getVariables() {
    return {
      text: this.props.text,
    };
  }
}
