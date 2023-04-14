import React from "react";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import { AuthConsumer } from "./SessionProvider";
import Schedules from "../screens/Schedule/Schedules";
import ScheduleValidation from "../screens/schedulevalidation/ScheduleValidation";
import UpdateVersions from "../screens/Versions/UpdateVersions";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";

function RestrictedRoute( {component: Component, show, ...props} ) {
    return(
        <Route exact {...props} render={ (componentProps) => {
            if(show){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/', state : { from: componentProps.location}}} />
                )
            }
        }} />
    )

}

function AppRoutes(props) {
    return (
        <BrowserRouter>
          <Switch>
            <Route component = { Login } path="/" exact/>
            <Route component = { Register } path="/register/" />
            <Route component = { Home } path="/home/" />
            <Route component = { Schedules } path="/scheduling/" />
            <Route component = { ScheduleValidation } path="/shedulingvalidation" />
            <Route component = { UpdateVersions } path="/updateversions/:id" />
           </Switch> 
        </BrowserRouter>


    );
}

export default () => (
    <AuthConsumer>
        { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)

//RestrictedRoute show={props.isAuthenticated} 