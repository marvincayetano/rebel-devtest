import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalGridForm, ModalButton } from '../../styles/AppStyles';

class AddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyValue: '',
      isError: false,
      pattern: new RegExp('^[A-z0-9]+$')
    };

    this.textInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { keyValue } = this.state;
    const newKeyValue = nextProps.current ? `${nextProps.current.key}=${nextProps.current.value}` : '';

    if (newKeyValue !== keyValue) this.setState({ keyValue: newKeyValue });
  }

  componentDidUpdate() {
    this.textInput.focus();
  }

  handleChange = (event) => {
    this.setState({ keyValue: event.target.value });
    const { value } = event.target;
    const splitStr = value.split('=');

    if (this.validateString(splitStr)) this.setState({ isError: false });
    else this.setState({ isError: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { value } = event.target.keyValue;
    const { onSubmit } = this.props;

    const splitStr = value.split('=');
    if (this.validateString(splitStr) && splitStr.length === 2) {
      onSubmit(splitStr);
      this.setState({ keyValue: '' });
    } else {
      this.setState({ isError: true });
      this.textInput.focus();
    }
  }

  validateString = (str) => {
    const { pattern } = this.state;
    const trimmedStr = str.map(s => s.trim());

    if (trimmedStr[0].match(pattern) && pattern.test(trimmedStr[1])) return `${trimmedStr[0]}=${trimmedStr[1]}`;

    return undefined;
  }

  render() {
    const { keyValue, isError } = this.state;
    const { current, onClose } = this.props;
    const formatError = isError ? <span>Invalid format</span> : <span />;

    return (
      <ModalGridForm onSubmit={e => this.handleSubmit(e)}>
        <p><b>{current ? 'Edit' : 'Add'}</b> key=value</p>
        <div>
          <input ref={(input) => { this.textInput = input; }} autoComplete="off" value={keyValue} onChange={e => this.handleChange(e)} placeholder="eg. dog=friend" type="text" name="keyValue" />
          {
            formatError
          }
        </div>
        <ModalButton type="reset" onClick={() => onClose()} grid={1}>Cancel</ModalButton>
        <ModalButton type="submit" grid={3}>Save</ModalButton>
      </ModalGridForm>
    );
  }
}

AddModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  current: PropTypes.object
};

AddModal.defaultProps = {
  current: undefined,
};

export default AddModal;
