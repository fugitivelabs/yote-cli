
import * as Actions from './__name__Actions';
// import * as singleActions from './__name__SingleActions';

function __name__(state = {
  //define fields for a "new" __name__
  // a component that creates a new object should store a copy of this in it's state
  defaultItem: {
    title: ""
    , description: ""
  }

  , map: {} //map of all items

  , selected: { //single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }
  , lists: {

    all: {
      isFetching: false
      , error: null
      , didInvalidate: false
      , lastUpdated: null
      , items: []
      , pagination: {}
      , filter: {
        type: ''
        , sortBy: ''
        , query: ''
      }
    }
    // add other lists here, like "published" or "featured"
    // accessed like "__name__.lists.all" or "__name__.lists.published"

  }
}, action) {
  let nextState = Object.assign({}, state, {});
  switch(action.type) {
//SINGLE ITEM ACTIONS
    case Actions.REQUEST_SINGLE___allCaps__:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_SINGLE___allCaps__:
      if(action.success) {
        console.log("Mapping now");
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }
    
    case Actions.ADD_SINGLE___allCaps___TO_MAP:
      console.log("ADD_SINGLE___allCaps___TO_MAP");
      var newMap = Object.assign({}, state.map, {}); //copy map
      newMap[action.item._id] = action.item; //add single
      return Object.assign({}, state, {
        map: newMap
      })

    case Actions.REQUEST_CREATE___allCaps__:
      console.log("REQUEST_CREATE___allCaps__");
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_CREATE___allCaps__:
      console.log("RECEIVE_CREATE___allCaps__");
      if(action.success) {
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_UPDATE___allCaps__:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case Actions.RECEIVE_UPDATE___allCaps__:
      if(action.success) {
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_DELETE___allCaps__:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_DELETE___allCaps__:
      if(action.success) {
        //remove object from map
        let newMap = Object.assign({}, state.map, {});
        delete newMap[action.id]; //remove key
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: null
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

//LIST ACTIONS
    case Actions.REQUEST___allCaps___LIST:
      nextState = Object.assign({}, state, {});
      nextState.lists.all.isFetching = true;
      nextState.lists.all.error = null;
      nextState.lists.all.items = [];
      return nextState;
    case Actions.RECEIVE___allCaps___LIST:
      nextState = Object.assign({}, state, {});
      if(action.success) {
        //add api array objects to map
        //NOTE: should the "all" list overwrite the map? others only add to the map.
        let newMap = Object.assign({}, state.map, {});
        let idArray = [];
        for(var i = 0; i < action.list.length; i++) {
          idArray.push(action.list[i]._id);
          newMap[action.list[i]._id] = action.list[i];
        }
        //if "all" is a just a string type, we could generalize this reducer to any "typed" list
        nextState.lists.all.isFetching = false;
        nextState.lists.all.error = null;
        nextState.lists.all.items = idArray;
        nextState.lists.all.didInvalidate = false;
        nextState.lists.all.lastUpdated = action.receivedAt
        nextState.map = newMap;
        return nextState;
      } else {
        nextState.lists.all.isFetching = false;
        nextState.lists.all.error = action.error;
        nextState.lists.all.items = [];
        nextState.lists.all.didInvalidate = true;
        nextState.lists.all.lastUpdated = action.receivedAt
        return nextState;
      }
    case Actions.SET___allCaps___FILTER:
      let newList = Object.assign({}, state.lists[action.listType], {});
      // newList.
      return Object.assign({}, state, {
        //TODO
      })

    case Actions.SET___allCaps___SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
        , type: action.listType
      })
    case Actions.SET___allCaps___QUERY:
      return Object.assign({}, state, {
        query: action.query
        , listType: action.listType
      })
    case Actions.SET___allCaps___PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
    case Actions.INVALIDATE___allCaps___LIST:
      let nextState = Object.assign({}, state, {});
      nextState.lists[action.listType].didInvalidate = true;
      return nextState;

    default:
      return state
  }
}

export default __name__;
