import React, { Component } from 'react';
import { connect } from 'react-redux';
import {campusPut} from '../actions/campusActions';

class CampusFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus.oneCampus.name,
      dean: this.props.campus.oneCampus.dean,
      image: this.props.campus.oneCampus.image
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlePost(event) {
    event.preventDefault();
    const id = this.props.campus.oneCampus.id;
    this.props.updateCampus(id, this.state.name, this.state.dean, this.state.image);
  }

  render() {
    return (
      <div className="container">
        <h3>Edit Campus</h3>
        <form
          className="form-inline"
          onSubmit={this.handlePost}
        >
          <div className="form-group left">
            <label htmlFor="campus">Campus:</label>
            <input
              name="name"
              placeholder="Edit Name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="dean">Dean:</label>
            <input
              name="dean"
              placeholder="Edit Dean"
              className="form-control"
              value={this.state.dean}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="image">Image:</label>
            <input
              name="image"
              placeholder="Edit Image"
              className="form-control"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Edit Campus</button></span>
        </form>
        <br />
      </div >
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus
});

const mapDispatchToProps = dispatch => ({
  updateCampus: (id, name, dean, image) => dispatch(campusPut(id, name, dean, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampusFormEdit);
