import React from 'react';
import './App.css';
//import LeftMenu from './components/Menu/LeftMenu';

import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import AppRoutes from './main/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <AppRoutes/>
        <Router forceRefresh={true}>
          //
        </Router>
      </div>
    )
  }
}

//<LeftMenu/>