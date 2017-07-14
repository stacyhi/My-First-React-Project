import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { studentGetOne, studentDelete } from '../actions/studentActions';
import StudentFormEdit from './StudentFormEdit';

class OneStudent extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    }
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;
    this.props.getOneStudent(studentId);
  }

  handleEditClick() {
    this.setState({ showForm: true });
  }

  handleDeleteClick() {
    const studentId = this.props.student.oneStudent.id
    this.props.deleteStudent(studentId, this.props.history);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;
    this.props.getOneStudent(studentId);
  }

  render() {
    const thisStudent = this.props.student.oneStudent;
    return (
      <div className="container">
        <div className="row">
          <h1 className="xlarge-margin-top">{thisStudent.name}
            <span type="button" className="btn btn-primary btn-sm left-margin">
              <span className="glyphicon glyphicon-pencil" onClick={this.handleEditClick} />
            </span>
            <span type="button" className="btn btn-danger btn-sm left-margin">
              <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick} />
            </span>
          </h1>
          {this.state.showForm && <StudentFormEdit /> }
          <h2>Email: {thisStudent.email}</h2>
          <Link to={`/campus/${thisStudent.campus.id}`} >
            <h2>Campus: {thisStudent.campus.name}
            <span type="button" className="btn btn-primary btn-sm left-margin">
              <span className="glyphicon glyphicon-link" />
            </span>
            </h2>
            <div>
              <img className="img-thumbnail top-margin" style={{ height: '100px' }} src={`/images/${thisStudent.campus.image}`} />
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  student: storeState.student
});

const mapDispatchToProps = dispatch => ({
  getOneStudent: (studentId) => dispatch(studentGetOne(studentId)),
  deleteStudent: (studentId, history) => dispatch(studentDelete(studentId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneStudent);
