import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../../styles/AppStyles';

export default function Button({ name, onClick }) {
    return (<ActionButton onClick={() => onClick()}>{name}</ActionButton>);
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
