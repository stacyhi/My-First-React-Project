import React, { Component } from 'react';
import { connect } from 'react-redux';
import {campusPost} from '../actions/campusActions';

const defaultState = {
  newCampusName: '',
  newDean: '',
  newImage: 'defaultCampus.jpg'
}

class CampusFormAdd extends Component {
  constructor() {
    super();
    this.state = { defaultState };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDeanChange = this.handleDeanChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  componentDidMount() {
    this.setState(defaultState);
  }

  handleNameChange(event) {
    this.setState({ newCampusName: event.target.value });
  }
  handleDeanChange(event) {
    this.setState({ newDean: event.target.value });
  }
  handleImageChange(event) {
    this.setState({ newImage: event.target.value });
  }
  handlePost(event) {
    event.preventDefault();
    this.props.postNewCampus(this.state.newCampusName, this.state.newDean, this.state.newImage);
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
              name="name"
              placeholder="Enter New Name"
              className="form-control"
              value={this.state.newCampusName}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="dean">Dean:</label>
            <input
              name="dean"
              placeholder="Enter New Dean"
              className="form-control"
              value={this.state.newDean}
              onChange={this.handleDeanChange}
            />
          </div>
            <div className="form-group left">
            <label htmlFor="image">Image:</label>
            <input
              name="image"
              placeholder="Enter New Image"
              className="form-control"
              value={this.state.newImage}
              onChange={this.handleImageChange}
            />
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Add Campus</button></span>
        </form>
        <br />
      </div >
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus,
});

const mapDispatchToProps = dispatch => ({
  postNewCampus: (name, dean, image) => dispatch(campusPost(name, dean, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampusFormAdd);
