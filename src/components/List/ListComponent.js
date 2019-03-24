import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListTable, TableData } from '../../styles/AppStyles';

class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.list,
      active: 0,
    };
  }

  onClick = (i) => {
    const { onClick, loc } = this.props;

    this.setState({ active: i });
    onClick(i, loc);
  }

  render() {
    const { list } = this.props;
    const { active } = this.state;
    const items = [];

    for (let i = 0; i < 15; i += 1) {
      items.push(<tr onClick={() => this.onClick(i)} key={i}><TableData isactive={(active === i).toString()}>{list[i] ? `${list[i].key}=${list[i].value}` : ''}</TableData></tr>);
    }

    return (
      <ListTable>
        <tbody>{items}</tbody>
      </ListTable>
    );
  }
}

ListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
};

ListComponent.defaultProps = {
  list: [],
};

export default ListComponent;
