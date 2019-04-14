import React, { useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import FileDownload from 'js-file-download';

import { MainContainerDiv, GridContainerDiv, ButtonContainerDiv } from '../../styles/AppStyles';

import List from '../List/List';
import Button from '../Button/Button';
import Add from '../Modal/Add';

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

export default function App() {
    const [list, setList] = useState({ left: [], right: [] });
    useEffect(() => {
        client.query({
            query: QUERY_PAIRS,
        }).then(({ data: { pairs } }) => {
            const right = [];

            pairs.forEach((pair) => {
                right[pair.index] = {
                    index: pair.index, id: pair.id, key: pair.key, value: pair.value
                };
            });
            setList({ left: [], right });
        });
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [active, setActive] = useState({ left: 0, right: 0, loc: 'left' });

    const handleModalVisibility = (value) => {
        setIsModalVisible(value);
    };

    const handleSubmit = (value) => {
        list.left[active.left] = ({ key: value[0], value: value[1] });
        setIsModalVisible(false);
    };

    const handleAdd = () => {
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
                        setList({ left: [...list.left], right: [...list.right] });
                    });

                    break;
                }
            }
        }
    };

    const handleActivePair = (index, loc) => {
        const { left, right } = list;
        if (loc === 'left') setActive({ left: index, right, loc });
        else setActive({ left, right: index, loc });
    };

    const handleRemove = () => {
        if (active.loc === 'left') list.left[active.left] = undefined;
        else {
            const pair = list.right[active.right];
            list.right[active.right] = undefined;

            client.mutate({
                variables: { id: pair && pair.id },
                mutation: MUTATION_DELETEPAIR
            });
        }
        setList({ left: [...list.left], right: [...list.right] });
    };

    const handleClear = () => {
        client.mutate({
            mutation: MUTATION_DELETEMANYPAIR
        });
        setList({ left: list.left, right: [] });
    };

    const handleExport = () => {
        const { right } = list;
        const file = `<?xml version="1.0" encoding="UTF-8"?><list>${right.map(pair => (pair && `<pair><key>${pair.key}</key><value>${pair.value}</value></pair>`)).join('')}</list>`;

        FileDownload(file, 'list.xml');
    };

    const sortPairs = (type) => {
        const { left, right } = list;

        setList({
            left,
            right: right.sort((x, y) => {
                if (type === 'value') {
                    return x.value > y.value ? 1 : -1;
                }
                return x.key > y.key ? 1 : -1;
            })
        });
    };

    const handleSortName = (value) => {
        sortPairs(value);
    };


    const buttonList = [
        { name: 'Add', handler: handleAdd },
        { name: 'Remove Selected', handler: handleRemove },
        { name: 'Clear', handler: handleClear },
        { name: 'Export to XML', handler: handleExport },
        { name: 'Sort by Name', handler: () => handleSortName('key') },
        { name: 'Sort by Value', handler: () => handleSortName('value') }
    ];

    return (
        <MainContainerDiv>
            <Modal
                visible={isModalVisible}
                width="350"
                height="250"
                effect="fadeInUp"
                onClickAway={() => handleModalVisibility(false)}
            >
                <Add onSubmit={handleSubmit} onClose={() => handleModalVisibility(false)} />
            </Modal>

            <GridContainerDiv>
                <List onClick={handleActivePair} onDoubleClick={handleModalVisibility} loc="left" list={list.left} />
                <ButtonContainerDiv>
                    {
                        buttonList.map(item => <Button key={item.name} name={item.name} onClick={item.handler} />)
                    }
                </ButtonContainerDiv>
                <List onClick={handleActivePair} loc="right" list={list.right} />
            </GridContainerDiv>
        </MainContainerDiv>
    );
}
