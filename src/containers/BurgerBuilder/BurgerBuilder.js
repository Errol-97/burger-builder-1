import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import burger from '../../components/Burger/Burger';

const INGREDIENT_PRICES = {
        lettuce: 0.5,
        cheese: 3,
        bacon: 2,
        meat: 4
    }   

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        canPurchase: false,
        orderReady: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://react-burger-builder-be216-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            });
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
        this.setState({loading: true});
        //alert('Provide information');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,//in a real application you should calculate the price on the server side so the user doesn't manipulate the price in the code
            customer: {
                name: 'Errol Remmy',
                address: {
                    street: 'TestStreet1',
                    zipCode: '1234567',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false, orderReady: false});
                console.log(res);
            }).catch(err => {
                this.setState({loading: false, orderReady: false});
                console.log(err);
            });
    
    }

    

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }
        let orderSummary = null;
        
        

        let burgerWithControls = <Spinner />

        if(this.state.ingredients){
            burgerWithControls = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    canPurchase={this.state.canPurchase}
                    orderReady={this.orderReadyHandler}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} orderContinue={this.purchaseContinueHandler} modalClosed={this.purchaseCancelHandler}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        if(!this.state.ingredients){
            burgerWithControls = <Spinner />
        }

        return(
            <Auxiliary>
                <Modal show={this.state.orderReady} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerWithControls}
                
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);