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

  td {
    margin: 6px;
    height: 40px;
    border: 1px solid #DDDDDD;
    border-collapse: collapse;
    :hover {
      cursor: pointer;
      background: #3366BB;
    }
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
  > p {
    font-weight: 500;
    grid-area: 1 / 2;
  }
  > input {
    grid-area: 2 / 2;
    text-align: center;
  }
`;

const ModalButton = styled.button`
  grid-area: 3 / ${props => props.grid};
`;

export {
  ListTable,
  ModalButton,
  ActionButton,
  MainContainerDiv,
  GridContainerDiv,
  ButtonContainerDiv,
  ModalGridForm,
};
