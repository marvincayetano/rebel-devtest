import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../../styles/AppStyles';

export default function ButtonComponent({ name, onClick }) {
  return (<ActionButton onClick={() => onClick()}>{name}</ActionButton>);
}

ButtonComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
