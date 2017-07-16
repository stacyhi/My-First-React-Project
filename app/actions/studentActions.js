import axios from 'axios';

// action consts
export const STUDENT_WRITE_ONE = 'STUDENT_WRITE_PUT'
export const STUDENT_WRITE_ALL = 'STUDENT_WRITE_ALL'
export const STUDENT_DELETE = 'STUDENT_DELETE';

// action creators
const studentWriteOne = oneStudent => {
  console.log('STUDENT_WRITE_ONE', oneStudent)
  return {
    type: STUDENT_WRITE_ONE,
    data: oneStudent
  }
}

const studentWriteAll = allStudents => {
  return {
    type: STUDENT_WRITE_ALL,
    data: allStudents
  }
}

// action thunks
export const studentGetAll = () => dispatch => {
  axios.get('/api/student')
    .then(res => res.data)
    .then(response => {
      dispatch(studentWriteAll(response))
    })
};

export const studentGetOne = (studentId) => dispatch => {
  axios.get(`/api/student/${studentId}`)
    .then(res => res.data)
    .then(oneStudent => {
      dispatch(studentWriteOne(oneStudent))
    })
};

// export const studentPost = (name, email, campusId, history) => dispatch => {
//   const postData = {
//     name, email, campusId
//   }
//   axios.post('/api/student', postData)
//     .then(res => res.data)
//     .then(response => {
//       const id = response[0].id;
//       //this.context.history.push(`/student/${id}`);
//       dispatch(studentGetOne(id));
//     })
//     .catch(err => console.log('Error:', err));
// };


export function studentPost (name, email, campusId, history) {
  console.log('history',history);
  return function (dispatch) {
    const postData = {
      name, email, campusId
    }
    axios.post('/api/student', postData)
      .then(res => res.data)
      .then(response => {
        const id = response[0].id;
        history.push(`/student/${id}`);
        dispatch(studentGetOne(id));
      })
      .catch(err => console.log('Error:', err));
  }
}

export const studentPut = (id, name, email, campusId) => dispatch => {
  const postData = {
    id, name, email, campusId
  }
  axios.put(`/api/student/${id}`, postData)
    .then(res => res.data)
    .then(oneStudent => {
      dispatch(studentGetOne(oneStudent[1][0].id))
    })
    .catch(err => console.log('Error:', err));

};

export const studentDelete = (id, history) => dispatch => {
  const postData = {id}
  axios.delete(`/api/student/${id}`, postData)
    .then(() => {
      history.goBack();
      dispatch({ type: STUDENT_DELETE });
    })
    .catch(err => console.log('Error:', err));
};
