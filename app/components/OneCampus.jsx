import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class OneCampus extends Component {
  constructor() {
    super();
    this.state = {
      oneCampus: {},
      students: []
    }
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    axios.get(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(
      oneCampus => {
        this.setState({ oneCampus: oneCampus.campus })
        this.setState({ students: oneCampus.students })
      })
      .then(() => console.log(this.state.oneCampus.students))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <div><img className="img-thumbnail"
               style={{height:'100px'}} src={`/images/${this.state.oneCampus.image}`} /></div>
            <div><h1>
            {this.state.oneCampus.name}
            <Link to="/campus" type="button" className="btn btn-default btn-sm left-margin">
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </Link>
            </h1></div>
        </div>
        <div className="row">
          {this.state.students.map(student => {
            return (
              <div key={student.id} className="col-xs-6 col-md-4 nopadding">
                <div className="caption">
                  <h4 className="left">{student.name}</h4>
                  <h5 className="left">Email: {student.email}</h5>
                </div>
              </div>)
          })}
        </div>
      </div>
    )
  }
}
