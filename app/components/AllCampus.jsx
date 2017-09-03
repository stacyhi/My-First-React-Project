import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { campusGetAll } from '../actions/campusActions';
import CampusFormAdd from './CampusFormAdd';

class AllCampus extends Component {
  constructor() {
    super();
    this.state = {
      showForm: 'hidden',
      fromIcon: 'plus'
    }
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    this.props.getAllCampuses();
  }

  showForm() {
    const toggleForm = this.state.showForm || 'hidden';
    const formState = toggleForm === 'hidden' ? 'show' : 'hidden';
    const formIcon = toggleForm === 'hidden' ? 'minus' : 'plus';
    this.setState({ showForm: formState, formIcon })
  }

  render() {
    const showForm = this.state.showForm || 'hidden';
    const formIcon = this.state.formIcon || 'plus';
    return (
      <div className="container">
        <h1>Campuses
          <span type="button" className="btn btn-primary btn-sm left-margin">
            <span className={`glyphicon glyphicon-${formIcon}`} onClick={this.showForm} />
          </span>
        </h1>
        <div className={showForm}>
          {<CampusFormAdd />}
        </div>
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


