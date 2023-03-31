import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Schedules from "../screens/Schedule/Schedules";
import ScheduleValidation from "../screens/schedulevalidation/ScheduleValidation";
import UpdateVersions from "../screens/Versions/UpdateVersions";
import Home from "../screens/Home/Home";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Home } path="/" exact/>
            <Route component = { Schedules } path="/scheduling/" />
            <Route component = { ScheduleValidation } path="/shedulingvalidation" />
            <Route component = { UpdateVersions } path="/updateversions/:id" />
            
        </BrowserRouter>
    );
}

export default AppRoutes;