import React, {Component} from 'react';
import Auxilary from '../../../hoc/Auxiliary/Auxilary';

import Button from '../../UI/Button/Buttton';
class OrderSummary extends Component{
    //this could be a functiona component, doesnt have to be a class becuase we have should component update lifecycle hook in modal and this componennt only updates when modal updates
    componentDidUpdate(){
        console.log('[OrderSummary] Did Update');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey=> {
                return (
                    <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: ${this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.props.modalClosed}>Return to order</Button>
                <Button btnType="Success"  clicked={this.props.orderContinue}>Continue to checkout</Button>
                
            </Auxilary>
        );
    }
}
 
export default OrderSummary;