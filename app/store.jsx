import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import campus from './reducers/campus';
import student from './reducers/students';

const Reducers = combineReducers({
  campus,
  student
});

export default createStore(Reducers, applyMiddleware(thunkMiddleware, createLogger()));
