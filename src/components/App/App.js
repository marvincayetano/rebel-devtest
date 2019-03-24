import React, { Component } from 'react';
import { MainContainerDiv, GridContainerDiv, ButtonContainerDiv } from '../../styles/AppStyles';

import ListComponent from '../List/ListComponent';
import ButtonComponent from '../Button/ButtonComponent';

class App extends Component {
  constructor() {
    super();

    this.handleAdd = this.handleAdd.bind( this );
  }

  componentDidMount = () => {}

  handleAdd = () => {
    console.log('handler');
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
      { 'name': 'Add', 'handler': this.handleAdd },
      { 'name': 'Remove Selected', 'handler': this.handleRemove },
      { 'name': 'Clear', 'handler': this.handleClear },
      { 'name': 'Export to JSON', 'handler': this.handleExport },
      { 'name': 'Sort by Name', 'handler': this.handleSort },
      { 'name': 'Sort by Value', 'handler': this.handleSort }
    ];

    return (
      <MainContainerDiv>
        <GridContainerDiv>
          <ListComponent/>
          <ButtonContainerDiv>
            {
              buttonList.map((item, i) => {
                return <ButtonComponent key={i} name={item['name']} handler={item['handler']}></ButtonComponent>;
              })
            }
          </ButtonContainerDiv>
          <ListComponent/>
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}

export default App;
