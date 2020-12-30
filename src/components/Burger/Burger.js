import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngred = Object.keys(props.ingredients)
        .map(igKey => { 
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        }, []);

        console.log(transformedIngred);
        if(transformedIngred.length === 0){
            transformedIngred = <p>Please enter ingredients</p>;
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngred}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}

export default burger;