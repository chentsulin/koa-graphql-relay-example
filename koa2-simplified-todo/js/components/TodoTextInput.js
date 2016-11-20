import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  state = {
    text: '',
  };

  componentDidMount() {
    findDOMNode(this).focus(); // eslint-disable-line react/no-find-dom-node
  }

  commitChanges = () => {
    const newText = this.state.text.trim();
    if (newText !== '') {
      this.props.onSave(newText);
      this.setState({ text: '' });
    }
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.commitChanges();
    }
  };

  render() {
    return (
      <input
        className={this.props.className}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder={this.props.placeholder}
        value={this.state.text}
      />
    );
  }
}
