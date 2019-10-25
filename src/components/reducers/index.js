import { combineReducers } from 'redux';
import feature from './feature';
import chart from './chart';
import data from './data';
import map from './map';

// import twrJson from '../../data/twrGeometry.json';
// import positive from '../../data/positive.json';
// import aurinNegative from '../../data/aurinNegative.json';

export default combineReducers({
    feature: feature,
    chart:chart,
    data:data,
    map:map
});
