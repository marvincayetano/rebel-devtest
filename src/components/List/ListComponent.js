import React from 'react';
import { ListTable } from '../../styles/AppStyles';

const ListComponent = (props) => {
  const items = Array(15).fill(<tr><td /></tr>);

  return (
    <ListTable>
      <tbody>
        {items}
      </tbody>
    </ListTable>
  );
};

export default ListComponent;
