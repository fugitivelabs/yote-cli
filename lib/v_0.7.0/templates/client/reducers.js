/**
 * Build the __PascalName__ store
 *
 * Follows best practices from Redux documentation:
 *   - Single source of truth
 *   - State/Store is read-only
 *   - Changes are made with pure functions
 *
 * See http://redux.js.org/docs/recipes/StructuringReducers.html for specific
 * docs on structuring reducers
 *
 * NOTE: In Yote, we try to keep actions and reducers dealing with CRUD payloads
 * in terms of 'item' or 'items'. This keeps the action payloads consistent and
 * aides various scoping issues with list management in the reducers.
 */

// import __name__ actions
import * as Actions from './__name__Actions';

/**
 * __name__List reducer -
 *
 * Accepts arbitrary list arguments and recursively builds nested list as needed
 *
 * NOTE: this is never called directly. Only by parent '__name__' reducer (defined
 * below) when dealing with a LIST action
 */
function __name__List(state = {
  /**
   * The "items" object defines the default state for a list
   *
   * NOTE: This is for reference only. The list is not actually initialized here.
   * The actual init happens the first time REQUEST_LIST is called.
   */
  items: [] // array of _id's
  , isFetching: false
  , error: null
  , didInvalidate: false
  , lastUpdated: null
  , pagination: {}
  , filter: {}

}, action) {
  // console.log("DEBUG", state, action.listArgs);
  let nextAction = JSON.parse(JSON.stringify(action)); // Only change copy. NOT the  original object
  nextAction.listArgs.shift();

  /**
   * Check for nested list --
   * If the action is asking for a nested state, like lists[workout][123ABC],
   * then recursively return an _additional_ __name__List reducer.
   *
   * Otherwise, return the actual __name__ lists' store
   */
  if(nextAction.listArgs.length > 0) {
    /**
     * The action is asking for a nested state, like lists[workout][123ABC].
     * Let's nest it by returning an additional __name__List reducer and trying again.
     */
    return Object.assign({}, state, {
      [nextAction.listArgs[0]]: __name__List(state[nextAction.listArgs[0]] || {}, nextAction)
    })
  } else {
    /**
     * Stop nesting. Instead listen for the actions and respond accordingly.
     */
    switch(action.type) {
      case Actions.INVALIDATE___actionCase___LIST: {
        return Object.assign({}, state, {
          didInvalidate: true
        })
      }
      case Actions.REQUEST___actionCase___LIST: {
        return Object.assign({}, state, {
          items: [] // array of _id's
          , isFetching: true
          , error: null
          , lastUpdated: null
          , pagination: state.pagination || {}
          , filter: state.filter || {}
        })
      }
      case Actions.RECEIVE___actionCase___LIST: {
        if(!action.success) {
          return Object.assign({}, state, {
            items: [] // array of _id's
            , isFetching: false
            , error: action.error
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
      case Actions.SET___actionCase___FILTER: {
        return Object.assign({}, state, {
          filter: action.filter
        })
      }
      case Actions.SET___actionCase___PAGINATION: {
        return Object.assign({}, state, {
          pagination: action.pagination
        })
      }
      default:
        return state;
    }
  }
}

/**
 * Primary __PascalName__ reducer -
 *
 * This is the single source of truth for all things '__name__' related within the
 * application. The primary components of the reducer are defined in detail below.
 *
 * The basic idea is that the reducer listens for actions indicating a desired
 * state change and the reducer returns a new _copy_ of the state accordingly.
 */
function __name__(state = {

  /**
   * "defaultItem" defines fields for a _new_ __name__
   * any component that creates a new __name__ object should store a copy of this
   * in its state
   */
  defaultItem: {
    name: ''
  }

  /**
   * "byId" is an object map of all __name__ items in the store. The map's keys are
   * the Mongo ids of the objects by default
   */
  , byId: {}

  /**
   * "selected" is a single _selected_ entity within the store
   *
   * For example, when changing the name of a __name__, the single __name__
   * being edited would be defined by "selected"
   */
  , selected: {
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }

  /**
   * "lists" corresponds to individual instances of the __name__List reducer as
   * defined above.
   *
   * NOTE: when requesting a list, if args are undefined, the lists defaults to
   * lists['all']
   */
  , lists: {}
}, action) {
  /**
   * Listen for the actions and respond accordingly.
   */
  switch(action.type) {
    /**
     * SINGLE __actionCase__ ACTIONS
     */
    case Actions.REQUEST_SINGLE___actionCase__: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_SINGLE___actionCase__: {
      if(action.success) {
        // add received object to map
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
        let selected = Object.assign({}, state.selected, {
          isFetching: false
          , error: action.error
          , lastUpdated: action.receivedAt
        })
        return Object.assign({}, state, selected);

      }
    }
    case Actions.ADD_SINGLE___actionCase___TO_MAP: {
      // deliberately add this __name__ to the map
      var newIdMap = Object.assign({}, state.byId, {}); //copy map
      newIdMap[action.item._id] = action.item; //add single
      return Object.assign({}, state, {
        byId: newIdMap
      })
    }
    case Actions.REQUEST_CREATE___actionCase__: {
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_CREATE___actionCase__: {
      if(action.success) {
        // add received object to map
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
    }
    case Actions.REQUEST_UPDATE___actionCase__: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_UPDATE___actionCase__: {
      if(action.success) {
        // add received object to map
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
    }
    case Actions.REQUEST_DELETE___actionCase__: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_DELETE___actionCase__: {
      if(action.success) {
        // remove object from map
        let newIdMap = Object.assign({}, state.byId, {});
        delete newIdMap[action.id]; // remove key
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
    }
    case Actions.INVALIDATE_SELECTED___actionCase__: {
      return Object.assign({}, state, {
        selected: {
          didInvalidate: true
        }
      })
    }

    /**
     * __actionCase__ LIST ACTIONS
     */
    case Actions.INVALIDATE___actionCase___LIST:
    case Actions.REQUEST___actionCase___LIST:
    case Actions.SET___actionCase___FILTER:
    case Actions.SET___actionCase___PAGINATION: {
      // forward these actions on to individual list reducer
      let nextLists = Object.assign({}, state.lists, {});
      return Object.assign({}, state, {
        lists: Object.assign({}, state.lists, {
          [action.listArgs[0]]: __name__List(state.lists[action.listArgs[0]] || {}, action)
        })
      })
    }
    case Actions.RECEIVE___actionCase___LIST: {
      // add received items to the "byId" map before we forward to individual list reducer
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
    }
    default: {
      return state
    }
  }
}

export default __name__;
