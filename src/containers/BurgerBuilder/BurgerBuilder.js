import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
        lettuce: 0.5,
        cheese: 3,
        bacon: 2,
        meat: 4
    }   

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            lettuce: 0, 
            bacon: 0, 
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        canPurchase: false,
        orderReady: false
    }

    updatePurchaseState(ing) {
        const sum = Object.keys(ing)
            .map(igKey => {
                return ing[igKey];
            }).reduce((sum, el)=>{
                return sum + el;
            }, 0);
            this.setState({canPurchase: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduc = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduc;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    orderReadyHandler = () => {
        this.setState({orderReady: true});
    }

    purchaseCancelHandler = () => {
        this.setState({orderReady: false});
    }

    purchaseContinueHandler = () => {
        this.setState({orderReady: false});
        alert('Provide information');
    }

    

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.orderReady} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} orderContinue={this.purchaseContinueHandler} modalClosed={this.purchaseCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler} 
                disabled={disabledInfo}
                price={this.state.totalPrice}
                canPurchase={this.state.canPurchase}
                orderReady={this.orderReadyHandler}/>
                
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;