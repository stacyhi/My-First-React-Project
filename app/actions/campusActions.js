import axios from 'axios';

export const CAMPUS_WRITE_ALL = 'CAMPUS_WRITE_ALL';
export const CAMPUS_WRITE_ONE = 'CAMPUS_WRITE_ONE';
export const CAMPUS_DELETE = 'CAMPUS_DELETE';


// action creators
const campusWriteAll = allCampus => {
  return {
    type: CAMPUS_WRITE_ALL,
    data: allCampus
  }
}

const campusWriteOne = oneCampus => {
  const sortedStudents = oneCampus.students;
  // sequelize won't sort my students
  // they're in an include
  sortedStudents.sort((a, b) => {
   if (a.name < b.name) return -1;
   if (a.name > b.name) return 1
   return 0;
  })
  oneCampus.students = sortedStudents;
  return {
    type: CAMPUS_WRITE_ONE,
    data: oneCampus
  }
}

// thunks
export const campusGetAll = () => dispatch => {
  axios.get('/api/campus')
    .then(res => res.data)
    .then(response => {
      dispatch(campusWriteAll(response))
    })
    .catch(err => console.log('Error:', err));
};

export const campusGetOne = (campusId) => dispatch => {
  axios.get(`/api/campus/${campusId}`)
    .then(res => res.data)
    .then(response => {
      dispatch(campusWriteOne(response))
    })
    .catch(err => console.log('Error:', err));
};

export function campusPost (name, dean, image, history) {
  return  dispatch => {
    const postData = {
      name, dean, image
    }
    axios.post('/api/campus', postData)
      .then(res => res.data)
      .then(response => {
        const id = response[0].id;
        history.push(`/campus/${id}`);
        dispatch(campusGetOne(id))
      })
      .catch(err => console.log('Error:', err));
  }
}

export const campusPut = (id, name, dean, image) => dispatch => {
  const postData = {
    name, dean, image
  }
  axios.put(`/api/campus/${id}`, postData)
    .then(res => res.data)
    .then(response => {
      dispatch(campusGetOne(response[1][0].id))
    })
    .catch(err => console.log('Error:', err));
};

export const campusDelete = (id, history) => dispatch => {
  const postData = {id}
  axios.delete(`/api/campus/${id}`, postData)
    .then(() => {
      history.push('/campus');
      dispatch({ type: CAMPUS_DELETE });
    })
    .catch(err => console.log('Error:', err));
};
