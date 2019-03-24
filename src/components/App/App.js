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
      active: {
        index: 0,
        loc: 'right',
      },
    };
  }

  handleAdd = () => {
    this.setState({ visible: true });
  }

  handleSubmit = (value) => {
    const { list, active } = this.state;

    list[active.loc === 'left' ? active.index + 15 : active.index] = ({ key: value[0], value: value[1] });
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  handleActivePair = (index, loc) => {
    this.setState({ active: { index, loc } });
  }

  handleRemove = () => {
    const { list, active } = this.state;

    if (active.loc === 'left') {
      list[active.index + 15] = undefined;
    } else {
      list[active.index] = undefined;
    }

    this.setState({ list });
  }

  handleClear = () => {
    this.setState({ list: [] });
  }

  handleExport = () => {
    const { list } = this.state;
    const file = `<?xml version="1.0" encoding="UTF-8"?><list>${list.map(pair => (pair ? `<pair><key>${pair.key}</key><value>${pair.value}</value></pair>` : '')).join('')}</list>`;

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
          <AddModal onClose={this.handleClose} ismax={list.length === 30} onSubmit={this.handleSubmit} />
        </Modal>

        <GridContainerDiv>
          <ListComponent onClick={this.handleActivePair} loc="left" list={list.slice(15, 30)} />
          <ButtonContainerDiv>
            {
              buttonList.map(item => <ButtonComponent key={item.name} name={item.name} onClick={item.handler} />)
            }
          </ButtonContainerDiv>
          <ListComponent onClick={this.handleActivePair} loc="right" list={list.slice(0, 15)} />
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}

export default App;
