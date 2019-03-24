import React, { Component } from 'react';
import { MainContainerDiv, GridContainerDiv } from '../../styles/AppStyles';

import ListComponent from '../List/ListComponent';

class App extends Component {
  render() {
    return (
      <MainContainerDiv>
        <GridContainerDiv>
          <ListComponent/>
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}

export default App;
