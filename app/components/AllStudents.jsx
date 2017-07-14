import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { studentGetAll } from '../actions/studentActions';
import StudentFormAdd from './StudentFormAdd';

class AllStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
    this.showAddForm = this.showAddForm.bind(this);
  }

  componentDidMount() {
    this.props.getAllStudents();
  }

  showAddForm() {
    this.setState({ showForm: true })
  }

  render() {
    return (
      <div className="container">
        <h1>Students
          <span type="button" className="btn btn-primary btn-sm left-margin">
            <span className="glyphicon glyphicon-plus" onClick={this.showAddForm} />
          </span>
        </h1>
        {this.state.showForm && <StudentFormAdd />}
        <div className="row">
          {this.props.student.allStudent.map(student => {
            const campusId = student.campus ? student.campus.id : '';
            const campusName = student.campus ? student.campus.name : '';
            return (
              <div key={student.id} className="col-xs-12 col-md-4 nopadding">
                <div className="caption">
                  <Link to={`/student/${student.id}`}>
                    <h4 className="left link">{student.name}</h4>
                  </Link>
                  <Link to={`/campus/${campusId}`}>
                    <h5 className="left link">Campus: {campusName}</h5>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  student: storeState.student
});

const mapDispatchToProps = dispatch => ({
  getAllStudents: () => dispatch(studentGetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);


