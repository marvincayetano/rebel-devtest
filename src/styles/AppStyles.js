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
  margin: 50px;
  display: grid;
  grid-column-gap: 50px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
`;

const ListTable = styled.table`
  text-align: left;
  border-collapse: collapse;
`;

const TableData = styled.td`
  margin: 6px;
  height: 40px;
  border: 1px solid #DDDDDD;
  background: ${props => ((props.isactive === 'true') ? '#3366BB' : 'none')};
  padding-left: 5px;
  border-collapse: collapse;
  :hover {
    cursor: pointer;
    background: ${props => ((props.isactive === 'true') ? '#3366BB' : '#74A3F2')};
  }
`;

const ActionButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  :hover {
    cursor: pointer;
  }
`;

const ButtonContainerDiv = styled.div`
  display: grid;
  grid-row-gap: 75px;
  grid-auto-rows: minmax(10px, 40px);
`;

const ModalGridForm = styled.form`
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  > div {
    height: 100%;
    display: grid;
    grid-area: 2 / 2;
    place-items: center;
    grid-template-rows: repeat(2, 1fr);
    > input {
      text-align: center;
    }
    > span {
      color: red;
      font-size: 12px;
    }
  }
  > p {
    font-weight: 500;
    grid-area: 1 / 2;
  }
`;

const ModalButton = styled.button`
  grid-area: 3 / ${props => props.grid};
`;

export {
  TableData,
  ListTable,
  ModalButton,
  ActionButton,
  ModalGridForm,
  MainContainerDiv,
  GridContainerDiv,
  ButtonContainerDiv,
};
