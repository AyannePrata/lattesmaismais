import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Schedules from "../screens/Schedule/Schedules";
import ScheduleValidation from "../screens/schedulevalidation/ScheduleValidation";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { ScheduleValidation } path="/" exact/>
            <Route component = { Schedules } path="/scheduling/"/>
        </BrowserRouter>
    );
}

export default AppRoutes;