import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { studentGetAll } from '../actions/studentActions';
import StudentFormAdd from './StudentFormAdd';

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      showForm: 'hidden',
      formIcon: 'plus'
    }
    this.showAddForm = this.showAddForm.bind(this);
  }

  componentDidMount() {
    this.props.getAllStudents();
  }

  showAddForm() {
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
        <h1>Students
          <span type="button" className="btn btn-primary btn-sm left-margin">
            <span className={`glyphicon glyphicon-${formIcon}`} onClick={this.showAddForm} />
          </span>
        </h1>
        <div className={showForm}>
          {<StudentFormAdd />}
        </div>
        <div className="threeColumns xlarge-left-margin">
        {this.props.student.allStudent.map(student => {
          const campusId = student.campus ? student.campus.id : '';
          const campusName = student.campus ? student.campus.name : '';
          return (
            <div key={student.id} className="caption bottom-margin noBreak">
              <Link to={`/student/${student.id}`}>
                <h4 className="left link">{student.name}</h4>
              </Link>
              <Link to={`/campus/${campusId}`}>
                <h5 className="left link">Campus: {campusName}</h5>
              </Link>
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


