import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { campusGetOne, campusDelete } from '../actions/campusActions';
import CampusFormEdit from './CampusFormEdit';



class OneCampus extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    }
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleEditClick() {
    this.setState({ showForm: true });
  }

  handleDeleteClick() {
    const campusId = this.props.campus.oneCampus.id
    this.props.deleteCampus(campusId,this.props.history);
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    this.props.getOneCampus(campusId);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>
            <img className="img-thumbnail" style={{ height: '100px' }} src={`/images/${this.props.campus.oneCampus.image}`} />
          </div>
          <div>
            <h1>{this.props.campus.oneCampus.name}
              <span type="button" className="btn btn-primary btn-sm left-margin">
                <span className="glyphicon glyphicon-pencil" onClick={this.handleEditClick} />
              </span>
              <span type="button" className="btn btn-danger btn-sm left-margin">
                <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick} />
              </span>
            </h1>
          </div>
          <div>
            <h2>Dean: {this.props.campus.oneCampus.dean}</h2>
            {this.state.showForm && <CampusFormEdit /> }
          </div>
        </div>
        <div className="row">
          { this.props.campus.oneCampus.students &&this.props.campus.oneCampus.students.map(student => {
            return (
              <div key={student.id} className="col-xs-12 col-md-4 nopadding">
                <div className="caption">
                  <Link to={`/student/${student.id}`}>
                    <h4 className="link left">{student.name}</h4>
                  </Link>
                  <h5 className="left">Email: {student.email}</h5>
                </div>
              </div>)
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus
});

const mapDispatchToProps = dispatch => ({
  getOneCampus: (campusId) => dispatch(campusGetOne(campusId)),
  deleteCampus: (campusId, history) => dispatch(campusDelete(campusId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneCampus);
