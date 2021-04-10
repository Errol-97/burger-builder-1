import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return ( 
        <div className={classes.checkoutSummary}>
            <h1>We hope you enjoy</h1>
            <div style={{widht: '300px',  height: '300px', maring: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked btnType="Danger">CANCEL</Button>
            <Button clicked btnType="Success">CONTINUE</Button>

        </div>
     );
}
 
export default checkoutSummary;