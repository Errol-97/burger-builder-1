import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Lettuce', type:'lettuce'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Total: <strong>${props.price}</strong></p>
        {controls.map(ctrl=> (
            <BuildControl key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemoved(ctrl.type)} 
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton} disabled={!props.canPurchase} onClick={props.orderReady}>ORDER NOW</button>
    </div>
);

export default buildControls;