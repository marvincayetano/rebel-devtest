import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import FileDownload from 'js-file-download';
import { MainContainerDiv, GridContainerDiv, ButtonContainerDiv } from '../../styles/AppStyles';

import ListComponent from '../List/ListComponent';
import ButtonComponent from '../Button/ButtonComponent';
import AddModal from '../Modal/AddModal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      list: [],
    };
  }

  handleAdd = () => {
    this.setState({ visible: true });
  }

  handleSubmit = (value) => {
    const { list } = this.state;

    list.push({ key: value[0], value: value[1] });
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  handleRemove = () => {
    // TODO: MODAL
  }

  handleClear = () => {
    this.setState({ list: [{ key: 'gago', value: 'puta' }] });
  }

  handleExport = () => {
    const { list } = this.state;
    const pairs = list.map(pair => pair.split('='));
    const file = `<?xml version="1.0" encoding="UTF-8"?>
                  <list>
                  ${pairs.map(pair => `<pair><key>${pair[0]}</key><value>${pair[1]}</value></pair>`)}
                  </list>`;
    FileDownload(file, 'list.xml');
  }

  handleSortName = () => {
    const { list } = this.state;
    this.setState({
      list: list.sort((x, y) => ((x.key > y.key) ? 1 : -1))
    });
  }

  handleSortValue = () => {
    const { list } = this.state;
    this.setState({
      list: list.sort((x, y) => ((x.value > y.value) ? 1 : -1))
    });
  }

  render() {
    const buttonList = [
      { name: 'Add', handler: this.handleAdd },
      { name: 'Remove Selected', handler: this.handleRemove },
      { name: 'Clear', handler: this.handleClear },
      { name: 'Export to XML', handler: this.handleExport },
      { name: 'Sort by Name', handler: this.handleSortName },
      { name: 'Sort by Value', handler: this.handleSortValue }
    ];

    const { visible, list } = this.state;

    return (
      <MainContainerDiv>

        <Modal
          visible={visible}
          width="350"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.handleClose()}
        >
          <AddModal onClose={this.handleClose} onSubmit={this.handleSubmit} />
        </Modal>

        <GridContainerDiv>
          {/* <ListComponent /> */}
          <ButtonContainerDiv>
            {
              buttonList.map(item => <ButtonComponent key={item.name} name={item.name} onClick={item.handler} />)
            }
          </ButtonContainerDiv>
          {/* <ListComponent list={list} /> */}
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}

export default App;
