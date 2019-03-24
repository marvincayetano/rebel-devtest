import React from 'react';
import { ActionButton } from '../../styles/AppStyles';

const ButtonComponent = (props) => {
  return (
    <ActionButton onClick={() => props.handler()}>{props.name}</ActionButton>
  );
};

export default ButtonComponent;