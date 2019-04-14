import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ModalGridForm, ModalButton } from '../../styles/AppStyles';

const PATTERN = new RegExp('^[A-z0-9 ]+$');

function validateString(str) {
    if ((str[0] && str[1]) && str[0].match(PATTERN) && str[1].match(PATTERN)) return `${str[0]}=${str[1]}`;
    return undefined;
}

export default function Add({ onSubmit, onClose }) {
    const textInput = useRef(null);
    const [modalValue, setModalValue] = useState({ keyValue: '', isError: false });
    useEffect(() => {
        textInput.current.focus();
    });

    const handleChange = (event) => {
        const { value } = event.target;
        setModalValue({ ...modalValue, keyValue: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { value } = event.target.keyValue;

        const splitStr = value.split('=').map(s => s.trim());
        if (validateString(splitStr) && splitStr.length === 2) {
            onSubmit(splitStr);
            setModalValue({ keyValue: '', isError: false });
        } else {
            setModalValue({ ...modalValue, isError: true });
            textInput.current.focus();
        }
    };

    const { keyValue, isError } = modalValue;
    const formatError = isError && <span>Invalid format</span>;

    return (
        <ModalGridForm onSubmit={e => handleSubmit(e)}>
            <p><b>Add</b> key=value</p>
            <div>
                <input ref={textInput} autoComplete="off" value={keyValue} onChange={e => handleChange(e)} placeholder="eg. dog=friend" type="text" name="keyValue" />
                {
                    formatError
                }
            </div>
            <ModalButton type="reset" onClick={() => onClose()} grid={1}>Cancel</ModalButton>
            <ModalButton type="submit" grid={3}>Save</ModalButton>
        </ModalGridForm>
    );
}

Add.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
