import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalGridForm, ModalButton } from '../../styles/AppStyles';

class AddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyValue: ''
    };
  }

  handleChange = (event) => {
    this.setState({ keyValue: event.target.value });
  }

  render() {
    const { onSubmit, onClose } = this.props;
    const { keyValue } = this.state;

    return (
      <ModalGridForm onSubmit={e => onSubmit(e)}>
        <p>Add</p>
        <input value={keyValue} onChange={e => this.handleChange(e)} placeholder="eg. dog=friend" type="text" name="keyValue" />
        <ModalButton type="reset" onClick={() => onClose()} grid={1}>Cancel</ModalButton>
        <ModalButton type="submit" grid={3}>Save</ModalButton>
      </ModalGridForm>
    );
  }
}

AddModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddModal;
