import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import FileDownload from 'js-file-download';

import { MainContainerDiv, GridContainerDiv, ButtonContainerDiv } from '../../styles/AppStyles';

import ListComponent from '../List/ListComponent';
import ButtonComponent from '../Button/ButtonComponent';
import AddModal from '../Modal/AddModal';

const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cju3i4hmq2bjc01ffpue0j3xd/master'
});

const MUTATION_CREATEPAIR = gql`
  mutation createPair($index: Int!, $key: String!, $value: String!) {
    createPair(data: {
      status: PUBLISHED
      index: $index
      key: $key
      value: $value
    })
    {
      id
      index
      key
      value
    }
}
`;

const MUTATION_DELETEPAIR = gql`
  mutation deletePair($id: ID!) {
    deletePair(where: {
      id: $id
    }) {
      key
      value
    }
  }
`;

const MUTATION_DELETEMANYPAIR = gql`
  mutation deleteManyPair {
    deleteManyPairs(where: {
      id_not: 0
    }) {
      count
    }
  }
`;

const QUERY_PAIRS = gql`
  query allPairs {
    pairs {
      id
      index
      key
      value
      createdAt
    }
  }
`;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      list: {
        left: [],
        right: []
      },
      active: {
        left: 0,
        right: 0,
        loc: 'left'
      },
      isModalVisible: false
    };
  }

  componentDidMount() {
    client.query({
      query: QUERY_PAIRS,
    }).then(({ data: { pairs } }) => {
      const right = [];

      pairs.forEach((pair) => {
        right[pair.index] = {
          index: pair.index, id: pair.id, key: pair.key, value: pair.value
        };
      });
      this.setState({ list: { left: [], right } });
    });
  }

  handleModalVisibility = () => {
    this.setState({ isModalVisible: true });
  }

  handleSubmit = (value) => {
    const { list, active } = this.state;

    list.left[active.left] = ({ key: value[0], value: value[1] });
    this.handleClose();
  }

  handleAdd = () => {
    const { active, list } = this.state;
    if (!list.left[active.left]) return;


    if (list.right.length < 15) {
      for (let i = 0; i < 15; i += 1) {
        if (!list.right[i]) {
          const pair = list.left[active.left];
          list.left[active.left] = undefined;

          client.mutate({
            variables: { index: i, key: pair.key, value: pair.value },
            mutation: MUTATION_CREATEPAIR
          }).then(({ data: { createPair } }) => {
            list.right[createPair.index] = createPair;
            this.setState({ list });
          });

          break;
        }
      }
    }
  }

  handleClose = () => {
    this.setState({ isModalVisible: false });
  }

  handleActivePair = (index, loc) => {
    const { active: { left, right } } = this.state;
    if (loc === 'left') this.setState({ active: { left: index, right, loc } });
    else this.setState({ active: { left, right: index, loc } });
  }

  handleRemove = () => {
    const { list, active } = this.state;

    if (active.loc === 'left') list.left[active.left] = undefined;
    else {
      const pair = list.right[active.right];
      list.right[active.right] = undefined;

      client.mutate({
        variables: { id: pair && pair.id },
        mutation: MUTATION_DELETEPAIR
      });
    }
    this.setState({ list });
  }

  handleClear = () => {
    const { list } = this.state;
    client.mutate({
      mutation: MUTATION_DELETEMANYPAIR
    });
    this.setState({ list: { left: list.left, right: [] } });
  }

  handleExport = () => {
    const { list: { right } } = this.state;
    const file = `<?xml version="1.0" encoding="UTF-8"?><list>${right.map(pair => (pair && `<pair><key>${pair.key}</key><value>${pair.value}</value></pair>`)).join('')}</list>`;

    FileDownload(file, 'list.xml');
  }

  handleSortName = () => {
    this.sortPairs('key');
  }

  handleSortValue = () => {
    this.sortPairs('value');
  }

  sortPairs(type) {
    const { list: { left, right } } = this.state;

    this.setState({
      list: {
        left,
        right: right.sort((x, y) => {
          if (type === 'value') {
            return x.value > y.value ? 1 : -1;
          }
          return x.key > y.key ? 1 : -1;
        })
      }
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

    const { isModalVisible, list } = this.state;
    return (
      <MainContainerDiv>
        <Modal
          visible={isModalVisible}
          width="350"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.handleClose()}
        >
          <AddModal onSubmit={this.handleSubmit} onClose={this.handleClose} />
        </Modal>

        <GridContainerDiv>
          <ListComponent onClick={this.handleActivePair} onDoubleClick={this.handleModalVisibility} loc="left" list={list.left} />
          <ButtonContainerDiv>
            {
                buttonList.map(item => <ButtonComponent key={item.name} name={item.name} onClick={item.handler} />)
              }
          </ButtonContainerDiv>
          <ListComponent onClick={this.handleActivePair} loc="right" list={list.right} />
        </GridContainerDiv>
      </MainContainerDiv>
    );
  }
}
