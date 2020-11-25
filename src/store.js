import { createStore } from 'redux';
import pokerReducer from './reducers/card';

export default createStore(pokerReducer)