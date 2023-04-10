import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Schedules from "../screens/Schedule/Schedules";
import ScheduleValidation from "../screens/schedulevalidation/ScheduleValidation";
import UpdateVersions from "../screens/Versions/UpdateVersions";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Login } path="/" exact/>
            <Route component = { Home } path="/home/" />
            <Route component = { Schedules } path="/scheduling/" />
            <Route component = { ScheduleValidation } path="/shedulingvalidation" />
            <Route component = { UpdateVersions } path="/updateversions/:id" />
            
        </BrowserRouter>
    );
}

export default AppRoutes;