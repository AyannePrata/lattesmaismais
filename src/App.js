import React from 'react';
import './App.css';

import ScheduleValidation from './screens/schedulevalidation/ScheduleValidation';
import Schedules from './screens/Schedule/Schedules';
export default class App extends React.Component {
  render() {
    return(
      <div>
        <ScheduleValidation />
      </div>
    )
  }
}

