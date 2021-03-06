import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from './HomePage';
import AllCampus from './AllCampus';
import OneCampus from './OneCampus';
import AllStudents from './AllStudents';
import OneStudent from './OneStudent';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/campus" component={AllCampus} />
              <Route path="/campus/:campusId" component={OneCampus} />
              <Route exact path="/student" component={AllStudents} />
              <Route path="/student/:studentId" component={OneStudent} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
