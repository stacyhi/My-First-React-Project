import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { studentPut } from '../actions/studentActions';
import { campusGetAll } from '../actions/campusActions';

class StudentFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.student.oneStudent.name,
      email: this.props.student.oneStudent.email,
      campusId: this.props.student.oneStudent.campusId
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
    const id = this.props.student.oneStudent.id;
    this.props.updateStudent(id, this.state.name, this.state.email, this.state.campusId);
  }

  render() {
    const campusMenu = this.props.campus.allCampus.map(campus => {
      if (campus) return <option key={campus.id} value={campus.id}>{campus.name}</option>
    })
    return (
      <div className="container">
        <h3>Edit Name</h3>
        <form
          className="form-inline"
          onSubmit={this.handlePost}
        >
          <div className="form-group left">
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              placeholder="Edit Name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              placeholder="Edit Email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label>Campus:</label>
            <select
              name="campusId"
              className="black"
              value={this.state.campusId}
              onChange={this.handleChange}
            >
              {campusMenu}
              ))}
            </select>
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Edit Student</button></span>
        </form>
        <br />
      </div >
    )
  }
}

const mapStateToProps = storeState => ({
  student: storeState.student,
  campus: storeState.campus
});

const mapDispatchToProps = dispatch => ({
  getAllCampuses: () => dispatch(campusGetAll()),
  updateStudent: (id, name, email, campusId) => dispatch(studentPut(id, name, email, campusId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentFormEdit);
