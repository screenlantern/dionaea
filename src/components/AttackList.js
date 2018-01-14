import React from 'react';

const AttackList = (props) => {
    return(
        <p>
            <span>{props.country}:</span> <span>{props.amount}</span>
        </p>
    );
};

export default AttackList;