import styled from 'styled-components';

const MainContainerDiv = styled.div`
  display: flex;
  z-index: 4000;
  min-height: 100vh;
  position: relative;
  background: #FFFFFF;
  flex-direction: column;
`;

const GridContainerDiv = styled.div`
  display: grid;
  min-height: 100vh;
  grid-column-gap: minmax(5px, 15px);
  grid-template-rows: minmax(10px, 1fr) 16fr minmax(10px, 1fr);
  grid-template-columns: minmax(10px, 1fr) 6fr 6fr 6fr minmax(10px, 1fr);
`;

const ListTable = styled.table`
  text-align: left;
  border-collapse: collapse;
  grid-area: 2 / 2 / 3 / 3;
  td {
    height: 40px;
    margin: 6px;
    border: 1px solid #DDDDDD;
    border-collapse: collapse;
    :hover {
      cursor: pointer;
      background: #A8D1FF;
    }
  }
`;

const ActionButton = styled.button`
  width: 100%;
`;


export {
  MainContainerDiv,
  GridContainerDiv,
  ActionButton,
  ListTable
}