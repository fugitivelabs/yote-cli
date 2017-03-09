
import * as Actions from './__name__Actions';

function __name__List(state = {
  //default state for a list
  // NOTE that this is not actually initialized here. the actual init happens the first time REQUEST_LIST is called.
  // this is for reference only
  items: [] //array of _id's
  , isFetching: false
  , error: null
  , didInvalidate: false
  , lastUpdated: null
  , pagination: {}
  , filter: {}

}, action) {
  // console.log("DEBUG", state, action.listArgs);
  let nextAction = JSON.parse(JSON.stringify(action)); //change copy not original object
  nextAction.listArgs.shift();
  if(nextAction.listArgs.length > 0) {
    //action is asking for a nested state, like lists[workout][123ABC]. return additional __name__List reducer.
    return Object.assign({}, state, {
      [nextAction.listArgs[0]]: __name__List(state[nextAction.listArgs[0]] || {}, nextAction)
    })
  } else {
    //don't nest any more, return actual __name__ list store
    switch(action.type) {
      case Actions.INVALIDATE___allCaps___LIST: {
        return Object.assign({}, state, {
          didInvalidate: true
        })
      }
      case Actions.REQUEST___allCaps___LIST: {
        return Object.assign({}, state, {
          items: [] //array of _id's
          , isFetching: true
          , error: null
          , lastUpdated: null
          , pagination: state.pagination || {}
          , filter: state.filter || {}
        })
      }
      case Actions.RECEIVE___allCaps___LIST: {
        if(!action.success) {
          return Object.assign({}, state, {
            items: [] //array of _id's
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          })
        } else {
          let idArray = [];
          for(const item of action.list) {
            idArray.push(item._id);
          }
          return Object.assign({}, state, {
            items: idArray
            , isFetching: false
            , error: action.error || null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          })
        }
      }
      case Actions.SET___allCaps___FILTER: {
        return Object.assign({}, state, {
          filter: action.filter
        })
      }
      case Actions.SET___allCaps___PAGINATION: {
        return Object.assign({}, state, {
          pagination: action.pagination
        })
      }
      default:
        return state;
    }
  }
}

function __name__(state = {
  //define fields for a "new" __name__
  // a component that creates a new object should store a copy of this in it's state
  defaultItem: {
    title: ""
    , description: ""
  }
  , byId: {} //map of all items
  , selected: { //single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }
  , lists: {} //individual instances of the __name__List reducer above
}, action) {
  // let nextState = Object.assign({}, state, {});
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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
      var newIdMap = Object.assign({}, state.byId, {}); //copy map
      newIdMap[action.item._id] = action.item; //add single
      return Object.assign({}, state, {
        byId: newIdMap
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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
        let newIdMap = Object.assign({}, state.byId, {});
        delete newIdMap[action.id]; //remove key
        return Object.assign({}, state, {
          byId: newIdMap
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
    case Actions.INVALIDATE_SELECTED___allCaps__:
      return Object.assign({}, state, {
        selected: {
          didInvalidate: true
        }
      })

//LIST ACTIONS
    case Actions.INVALIDATE___allCaps___LIST:
    case Actions.REQUEST___allCaps___LIST:
    case Actions.SET___allCaps___FILTER:
    case Actions.SET___allCaps___PAGINATION:
      //"forward" on to individual list reducer
      let nextLists = Object.assign({}, state.lists, {});
      return Object.assign({}, state, {
        lists: Object.assign({}, state.lists, {
          [action.listArgs[0]]: __name__List(state.lists[action.listArgs[0]] || {}, action)
        })
      })
    case Actions.RECEIVE___allCaps___LIST:
      //add items to "byId" before we forward to individual list reducer
      let newIdMap = Object.assign({}, state.byId, {});
      if(action.success) {
        for(const item of action.list) {
          newIdMap[item._id] = item;
        }
      }
      return Object.assign({}, state, {
        byId: newIdMap
        , lists: Object.assign({}, state.lists, {
          [action.listArgs[0]]: __name__List(state.lists[action.listArgs[0]], action)
        })
      })
    default:
      return state
  }
}

export default __name__;
