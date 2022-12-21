import React from 'react';
import './App.css';
import LeftMenu from './components/Menu/LeftMenu';
import AppRoutes from './main/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <AppRoutes/>
        <Router>
          <LeftMenu/>
        </Router>
      </div>
    )
  }
}

