import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListTable, TableData } from '../../styles/AppStyles';

export default function List({
    list, loc, onClick, onDoubleClick
}) {
    const [active, setActive] = useState(0);

    const handleClick = (i, location) => {
        setActive(i);
        onClick(i, location);
    };

    const items = [];
    for (let i = 0; i < 15; i += 1) {
        items.push(
            <tr onDoubleClick={() => onDoubleClick && onDoubleClick(true)} onClick={() => handleClick(i, loc)} key={i}>
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

List.propTypes = {
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.object),
    loc: PropTypes.string.isRequired
};

List.defaultProps = {
    onDoubleClick: undefined,
    list: [],
};
