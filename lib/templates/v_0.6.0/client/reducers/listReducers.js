/*****

LIST REDUCERS GO HERE


*****/

import  { listActions, singleActions } from '../actions';

//NOTES: eventually we'd like to remove the different reducers and just have a single __name__Reducer.
// with the maps, we can just find the "single" one by storing it's _id. create/update/delete also happen by the _id.
// we should also get rid of "populate" actions. instead of having to check if things are populated at ever turn,
// we can instead just check the _id of the item and the relevant map and request if it it's needed.
// finally, we can reduce server calls when moving between pages. if the map already has an entry for
// _id == xx, and lastUpdated is less than a few minutes, don't fetch anything.

function list(state = {
  isFetching: false
  , didInvalidate: false
  , items: []
  , itemMap: {}
  , lastUpdated: null
  , pagination: {}
  , filter: ''
  , sortBy: 'name' // 'sort' is a reserved word, so use sortBy
  , query: ''
  // , params: {} //object that we will use to filter down the list
  // , current: null //object id of the current one we are viewing
}, action) {
  switch (action.type) {
    case listActions.REQUEST___allCaps___LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE___allCaps___LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , itemMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , itemMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.RECEIVE_CREATE___allCaps__:
      // listen for newly created items and do something.

      /**
        For normal sized data sets, we'll flip didInvalidate to false so that we can re-fetch the list when needed.
      **/

      // console.log("RECEIVE_CREATE___allCaps__ --- invalidate list");
      if(action.success) {
        return Object.assign({}, state, {
          didInvalidate: true
        })
      } else {
        return Object.assign({}, state, {
          didInvalidate: false
        })
      }

      /**
        For extremely large data sets or if the item is needed in a list immediately, we'll simply add the new item to the items list and itemMap.  NOTE: We may want to make THIS the default behavior
      **/

      // // console.log("RECEIVE_CREATE___allCaps__ --- add to map");
      // if(action.success) {
      //   var newMap = Object.assign({}, state.itemMap, {});
      //   newMap[action.__name__._id] = action.__name__; //add or replace key [_id] on existing map object
      //   var newItems = state.items;
      //   newItems.push(action.__name__); // add new item to the items array
      //
      //   return Object.assign({}, state, {
      //     isFetching: false
      //     , itemMap: newMap
      //     , items: newItems
      //     , lastUpdated: action.receivedAt
      //   })
      // } else {
      //   return Object.assign({}, state, {
      //     isFetching: false
      //     , error: action.error
      //   })
      // }
    default:
      return state
  }
}

export default list;
