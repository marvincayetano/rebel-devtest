import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { MainContainerDiv, GridContainerDiv, ButtonContainerDiv } from '../../styles/AppStyles';

import ListComponent from '../List/ListComponent';
import ButtonComponent from '../Button/ButtonComponent';
import AddModal from '../Modal/AddModal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };
  }

  componentDidMount = () => {}

  handleAdd = () => {
    this.setState({ visible: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.keyValue;

    console.log(value);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  handleRemove = () => {
    // TODO: MODAL
  }

  handleClear = () => {
    // TODO: MODAL
  }

  handleExport = () => {
    // TODO: MODAL
  }

  handleSort = () => {
    // TODO: MODAL
  }

  render() {
    const buttonList = [
      { name: 'Add', handler: this.handleAdd },
      { name: 'Remove Selected', handler: this.handleRemove },
      { name: 'Clear', handler: this.handleClear },
      { name: 'Export to XML', handler: this.handleExport },
      { name: 'Sort by Name', handler: this.handleSort },
      { name: 'Sort by Value', handler: this.handleSort }
    ];

    const { visible } = this.state;

    return (
      <MainContainerDiv>

        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.handleClose()}
        >
          <AddModal onClose={this.handleClose} onSubmit={this.handleSubmit} />
        </Modal>

        <GridContainerDiv>
          <ListComponent />
          <ButtonContainerDiv>
            {
              buttonList.map(item => <ButtonComponent key={item.name} name={item.name} onClick={item.handler} />)
            }
          </ButtonContainerDiv>
          <ListComponent />
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}

export default App;
