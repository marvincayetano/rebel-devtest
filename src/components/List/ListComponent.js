import React from 'react';
import PropTypes from 'prop-types';
import { ListTable } from '../../styles/AppStyles';

const ListComponent = (props) => {
  const { list } = props;
  const items = Array(15).fill(<tr><td>{list ? list[0] : ''}</td></tr>);

  return (
    <ListTable>
      <tbody>
        {items}
      </tbody>
    </ListTable>
  );
};

ListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

ListComponent.defaultProps = {
  list: [],
};

export default ListComponent;
