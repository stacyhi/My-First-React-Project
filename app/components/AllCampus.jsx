import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { campusGetAll, campusShowForm } from '../actions/campusActions';
import CampusFormAdd from './CampusFormAdd';

class AllCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    this.props.getAllCampuses();
  }

  showForm() {
    this.setState({ showForm: true })
  }

  render() {
    return (
      <div className="container">
        <h1>Campuses
          <span type="button" className="btn btn-primary btn-sm left-margin">
            <span className="glyphicon glyphicon-plus" onClick={this.showForm} />
          </span>
        </h1>
        {this.state.showForm && <CampusFormAdd />}
        <div className="row">
          {this.props.campus.allCampus.map(campus => {
            return (
              <div key={campus.id} className="col-xs-12 col-md-4 nopadding">
                <Link className="thumbnail" to={`/campus/${campus.id}`}>
                  <img className="img-responsive" style={{ height: '260px' }} src={`/images/${campus.image}`} />
                  <div className="caption">
                    <h4>{campus.name}</h4>
                    <h5>Dean: {campus.dean}</h5>
                  </div>
                </Link>
              </div>)
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  campus: storeState.campus
});

const mapDispatchToProps = dispatch => ({
  getAllCampuses: () => dispatch(campusGetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCampus);


