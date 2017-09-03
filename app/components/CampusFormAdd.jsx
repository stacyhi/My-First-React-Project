import React, { Component } from 'react';
import { connect } from 'react-redux';
import {campusPost} from '../actions/campusActions';
import { withRouter } from 'react-router-dom'

const defaultState = {
  newCampusName: '',
  newDean: '',
  newImage: 'defaultCampus.jpg'
}

class CampusFormAdd extends Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlePost(event) {
    event.preventDefault();
    this.props.postNewCampus(this.state.newCampusName, this.state.newDean, this.state.newImage, this.props.history);
    this.setState(defaultState);
  }

  render() {
    return (
      <div className="container">
        <h3>Add Campus</h3>
        <form
          className="form-inline"
          onSubmit={this.handlePost}
        >
          <div className="form-group left">
            <label htmlFor="name">Campus:</label>
            <input
              type="text"
              name="newCampusName"
              placeholder="Enter New Name"
              className="form-control"
              value={this.state.newCampusName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="dean">Dean:</label>
            <input
              name="newDean"
              placeholder="Enter New Dean"
              className="form-control"
              value={this.state.newDean}
              onChange={this.handleChange}
            />
          </div>
            <div className="form-group left">
            <label htmlFor="image">Image:</label>
            <input
              name="newImage"
              placeholder="Enter New Image"
              className="form-control"
              value={this.state.newImage}
              onChange={this.handleChange}
            />
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Add Campus</button></span>
        </form>
        <br />
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus,
});

const mapDispatchToProps = dispatch => ({
  postNewCampus: (name, dean, image, history) => dispatch(campusPost(name, dean, image, history)),
});

const routerCampusFormAdd = withRouter(CampusFormAdd);
export default connect(mapStateToProps, mapDispatchToProps)(routerCampusFormAdd);
