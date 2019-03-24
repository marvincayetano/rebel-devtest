import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../../styles/AppStyles';

const ButtonComponent = (props) => {
  const { name } = props;
  return (
    <ActionButton onClick={() => props.onClick()}>{name}</ActionButton>
  );
};

ButtonComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};


export default ButtonComponent;
