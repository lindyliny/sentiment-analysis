import {ADD_DATA} from '../utils/constants';
import positive from '../../data/positive.json';
import aurinNegative from '../../data/negative.json';

const INITIAL_STATE = {
  positive,
  aurinNegative
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DATA:
      console.log(ADD_DATA,action);
      return {...state,[action.payload.key]:action.payload.data}
    default:
      return state;
  }
}
