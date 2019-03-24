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

  componentDidUpdate() {
    // update state
  }

  onClick = (i) => {
    this.setState({ active: i });
  }

  // TODO: SET ACTIVE APP COMPOENNT active: {leftActive: index, rightActive:index, active: index}
  render() {
    const { list, loc } = this.props;
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
  loc: PropTypes.string.isRequired
};

ListComponent.defaultProps = {
  list: [],
};

export default ListComponent;
