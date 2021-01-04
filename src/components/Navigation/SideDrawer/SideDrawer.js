import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigaitonItems';
import classes from './SideDrawer.module.css';
import Auxilary from '../../../hoc/Auxiliary/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return ( 
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilary>
        

     );
};
 
export default sideDrawer;