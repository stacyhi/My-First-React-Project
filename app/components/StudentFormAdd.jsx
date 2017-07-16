import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { campusGetAll } from '../actions/campusActions';
import { studentPost } from '../actions/studentActions';

class StudentFormAdd extends Component {
  constructor() {
    super();
    this.state = {
      newName: '',
      newEmail: '',
      newCampus: '1'
    };
   this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    console.log('didMount', this.props);
    this.props.getAllCampuses();
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ newEmail: event.target.value });
  }

  handleCampusChange(event) {
    this.setState({ newCampus: event.target.value });
  }

  handlePost(event) {
    event.preventDefault();
    this.props.postNewStudent(this.state.newName, this.state.newEmail, this.state.newCampus, this.props.history);
    this.setState({
      newName: '',
      newEmail: '',
      newCampus: '1',
    });
  }

  render() {
    const campusMenu = this.props.campus.allCampus.map(campus => {
      if (campus) return <option key={campus.id} value={campus.id}>{campus.name}</option>
    })
    return (
      <div className="container">
        <h3>Add Student</h3>
        <form
          className="form-inline"
          onSubmit={this.handlePost}
        >
          <div className="form-group left">
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              placeholder="Enter New Name"
              className="form-control"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              placeholder="Enter New Email"
              className="form-control"
              value={this.state.newEmail}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group left">
            <label>Campus:</label>
            <select
              className="black"
              onChange={this.handleCampusChange}
            >
              {campusMenu}
              ))}
            </select>
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Add Student</button></span>
        </form>
        <br />
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus,
  student: storeState.student
});

const mapDispatchToProps = dispatch => ({
  getAllCampuses: () => dispatch(campusGetAll()),
  postNewStudent: (name, email, campus, history) => dispatch(studentPost(name, email, campus, history)),
});

const routerStudentFormAdd = withRouter(StudentFormAdd)
export default connect(mapStateToProps, mapDispatchToProps)(routerStudentFormAdd);
