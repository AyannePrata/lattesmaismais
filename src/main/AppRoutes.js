import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Schedules from "../screens/Schedule/Schedules";
import ScheduleValidation from "../screens/schedulevalidation/ScheduleValidation";
import Versions from "../screens/versions/Versions";

import Home from "../screens/Home/Home";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Home } path="/" exact/>
            <Route component = { Schedules } path="/scheduling/"/>
            <Route component = { ScheduleValidation } path="/shedulingvalidation"/>
            <Route component = { Versions } path="/versions"/>
            
        </BrowserRouter>
    );
}

export default AppRoutes;