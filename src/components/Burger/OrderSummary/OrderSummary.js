import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Buttton';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey=> {
            return (
                <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Auxilary>
            
            <h3>Your Order</h3>
            <p>Delicious burger. Please review your order</p>
            <ul>
                {ingredientSummary}
            </ul>
            <Button btnType="Danger" clicked={props.modalClosed}>Continue to checkout</Button>
            <Button btnType="Success"  clicked={props.orderContinue}>Return to order</Button>
            
        </Auxilary>
      );
}
 
export default orderSummary;