import { STUDENT_WRITE_ALL, STUDENT_WRITE_ONE, STUDENT_DELETE } from '../actions/studentActions.js'

const initialState = {
  allStudent: [],
  oneStudent: {
    campus: '',
    campusId: 0
  },
}

const studentReducer = (storeState = initialState, action) => {
  const newState = Object.assign({}, storeState);
  switch (action.type) {
    case STUDENT_WRITE_ALL:
      newState.allStudent = action.data;
      return newState;
    case STUDENT_WRITE_ONE:
      newState.oneStudent = action.data;
      newState.allStudent = [action.data].concat(newState.allStudent);
      return newState;
    case STUDENT_DELETE:
      newState.oneStudent = {
        campus: '',
        campusId: 0
      };
      return newState;
    default:
      return storeState
  }
};

export default studentReducer
