import { combineReducers } from 'redux';

// import reducers
import list from './__name__ListReducers';
import single from './__name__SingleReducers';
// import populated from './__name__PopulatedReducers';

const __name__Reducer = combineReducers({
  list
  , single
});

export default __name__Reducer;
