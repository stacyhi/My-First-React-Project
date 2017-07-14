import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <div className="container large-margin">
          <div className="row text-center">
            <div className="large-margin">
              <img src="/images/logo.png" className="img-responsive center-block" />
            </div>

            <div className="btn-group">
              <Link to="/campus" className="btn btn-primary btn-xlarge">Campuses</Link>
              <Link to="/student" className="btn btn-default btn-xlarge">Students</Link>
            </div>
          </div>
        </div>
        <div className="container large-margin">
          <div className="row text-center">
             <h2>Margaret Hamilton Academy Is an Immersive<br/>Software Development School Spanning Galaxies</h2>
          </div>
        </div>
      </div>
    )
  }
}
