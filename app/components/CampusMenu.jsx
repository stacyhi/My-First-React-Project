import React, { Component } from 'react';
import { connect } from 'react-redux';
import { campusGetAll } from '../actions/campusActions';

class CampusMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'foobar'
    }
  }

  componentDidMount() {
    this.props.getAllCampuses();
  }

  render() {
    return (
      <select
      className="black"
      onChange="">
        <option selected disabled hidden>x {this.state.foo}</option>
        {
          this.props.campus.allCampus.map(campus => (
            <option key={campus.name} value={campus.id}>{campus.name}</option>
          ))
        }
      </select>
    )
  }
}


const mapStateToProps = storeState => ({
  campus: storeState.campus
});

const mapDispatchToProps = dispatch => ({
  getAllCampuses: () => dispatch(campusGetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampusMenu);
