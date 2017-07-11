import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CampusForm from './CampusForm';

export default class AllCampus extends Component {
  constructor() {
    super();
    this.state = {
      campus: [],
      showCampusForm: false
    }
    this.showCampusForm = this.showCampusForm.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campus')
      .then(res => res.data)
      .then(
      campus => {
        console.log('campus', campus)
        this.setState({ campus })
      });
  }
  showCampusForm(){
    this.setState({ showCampusForm: true });
  }

  render() {
    return (
      <div className="container">
      <h1>Locations
        <Link to="/campus" type="button" className="btn btn-default btn-sm left-margin">
          <span className="glyphicon glyphicon-plus" onClick={this.showCampusForm} />
        </Link>
      </h1>
      { this.state.showCampusForm ? <CampusForm /> : null }
        <div className="row">
          {this.state.campus.map(campus => {
            return (
            <div key={campus.id} className="col-xs-12 col-md-6 nopadding">
              <Link className="thumbnail" to={`/campus/${campus.id}`}>
                <img className="img-responsive" style={{height:'410px'}} src={`/images/${campus.image}`} />
                  <div className="caption">
                  <h4>{campus.name}</h4>
                  <h5>Dean: {campus.dean}</h5>
                </div>
              </Link>
            </div>)
          })}
        </div>
      </div>
    )
  }
}

