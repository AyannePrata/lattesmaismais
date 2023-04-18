import React from 'react';
import './App.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import SessionProvider from './main/SessionProvider';
import AppRoutes from './main/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <SessionProvider>
          <AppRoutes/>
        </SessionProvider>
        
      </div>
    )
  }
}

//<LeftMenu/>