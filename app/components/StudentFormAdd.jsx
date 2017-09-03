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

    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    this.props.getAllCampuses();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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
              name="newName"
              placeholder="Enter New Name"
              className="form-control"
              value={this.state.newName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="email">Email:</label>
            <input
              name="newEmail"
              placeholder="Enter New Email"
              className="form-control"
              value={this.state.newEmail}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label>Campus:</label>
            <select
              name="newCampus"
              className="black"
              onChange={this.handleChange}
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
