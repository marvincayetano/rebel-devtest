import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListTable, TableData } from '../../styles/AppStyles';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };
  }

  onClick = (i, loc) => {
    const { onClick } = this.props;
    this.setState({ active: i });
    onClick(i, loc);
  }

  render() {
    const items = [];
    const { list, loc, onDoubleClick } = this.props;
    const { active } = this.state;

    for (let i = 0; i < 15; i += 1) {
      items.push(
        <tr onDoubleClick={() => onDoubleClick && onDoubleClick()} onClick={() => this.onClick(i, loc)} key={i}>
          <TableData isactive={(active === i).toString()}>{list[i] && `${list[i].key}=${list[i].value}`}</TableData>
        </tr>
      );
    }

    return (
      <ListTable>
        <tbody>{items}</tbody>
      </ListTable>
    );
  }
}

ListComponent.propTypes = {
  onDoubleClick: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  loc: PropTypes.string.isRequired
};

ListComponent.defaultProps = {
  onDoubleClick: undefined,
  list: [],
};
