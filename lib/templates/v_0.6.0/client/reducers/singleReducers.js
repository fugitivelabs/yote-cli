/*****

SINGLE REDUCERS GO HERE


*****/


// import * as singleActions from '../actions/__name__SingleActions';
import { singleActions } from '../actions';

//define default empty object
let default__Proper__ = {
  title: ""
  , description: ""
}


function single(state = {
  isFetching: false
  , item: {}
  , populated: false
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case singleActions.REQUEST_SINGLE___allCaps__:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {} // when transitioning within states where this is already populate -- i.e. from 'Single' to 'Update', this forces a refresh on the element, which isn't desirable.  Also, retrieve error is handled below, so this shouldn't be necessary even when calling new instances
        , status: null
      })
    case singleActions.RECEIVE_SINGLE___allCaps__:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.__name__
          , error: null
          , populated: false
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , populated: false
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.REQUEST_AND_POPULATE_SINGLE___allCaps__:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {} // see above
        , status: null
      })
    case singleActions.RECEIVE_POPULATED_SINGLE___allCaps__:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.__name__
          , error: null
          , populated: true
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , populated: true
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.SETUP_NEW___allCaps__:
      console.log("SETUP_NEW___allCaps__");
      return Object.assign({}, state, {
        isFetching: false
        , item: JSON.parse(JSON.stringify(default__Proper__))
        , populated: false
      });
    case singleActions.REQUEST_CREATE___allCaps__:
      console.log("REQUEST_CREATE___allCaps__");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.__name__
        , status: 'creating'
      })
    case singleActions.RECEIVE_CREATE___allCaps__:
      console.log("RECEIVE_CREATE___allCaps__");
      console.log(action);
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.__name__
          , status: null
          , populated: false
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , populated: false
          , error: action.error
        })
      }
    case singleActions.REQUEST_UPDATE___allCaps__:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.__name__
        , status: 'updating'
      })
    case singleActions.RECEIVE_UPDATE___allCaps__:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.__name__
          , status: null
          , populated: false
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , populated: false
          , error: action.error
        })
      }
    default:
      return state
  }
}

export default single;
