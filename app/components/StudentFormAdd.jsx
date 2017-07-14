import React, { Component } from 'react';
import { connect } from 'react-redux';

import { campusGetAll } from '../actions/campusActions';
import { studentPost } from '../actions/studentActions';

// const inputLength = 5;
// const tooLong = 24;
// const tooShort = 0; // < 1 && dirty
// const dirty = false; //add to state
// //handle change dirty = true

class StudentFormAdd extends Component {
  constructor() {
    super();
    this.state = {
      newName: '',
      newEmail: '',
      newCampus: 'n/a'
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
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
    this.props.postNewStudent(this.state.newName, this.state.newEmail, this.state.newCampus);
    this.setState({
      newName: '',
      newEmail: '',
      newCampus: 'n/a',
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
              placeholder="Enter new name"
              className="form-control"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              placeholder="Enter new Email"
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
        {/*<div className="alert alert-warning">This is a warning</div>*/}
        <br />
      </div >
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus,
  student: storeState.student
});

const mapDispatchToProps = dispatch => ({
  getAllCampuses: () => dispatch(campusGetAll()),
  postNewStudent: (name, dean, image) => dispatch(studentPost(name, dean, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentFormAdd);
