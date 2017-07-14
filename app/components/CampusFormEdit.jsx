import React, { Component } from 'react';
import { connect } from 'react-redux';
import {campusPut} from '../actions/campusActions';

class CampusFormEdit extends Component {
  constructor(props) {
    super(props);
    console.log('props',this.props)
    this.state = {
      name: this.props.campus.oneCampus.name,
      dean: this.props.campus.oneCampus.dean,
      image: this.props.campus.oneCampus.image
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDeanChange = this.handleDeanChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDeanChange(event) {
    this.setState({ dean: event.target.value });
  }
  handleImageChange(event) {
    this.setState({ image: event.target.value });
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
              name="campus"
              placeholder="Edit name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="dean">Dean:</label>
            <input
              name="dean"
              placeholder="Edit Dean"
              className="form-control"
              value={this.state.dean}
              onChange={this.handleDeanChange}
            />
          </div>
          <div className="form-group left">
            <label htmlFor="image">Image:</label>
            <input
              name="image"
              placeholder="Edit image"
              className="form-control"
              value={this.state.image}
              onChange={this.handleImageChange}
            />
          </div>
          <span className="left-margin"><button className="btn btn-success" type="submit">Edit Location</button></span>
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
