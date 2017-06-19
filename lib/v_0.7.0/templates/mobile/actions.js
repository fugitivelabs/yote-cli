/*****
SINGLE __actionCase__ CRUD ACTIONS GO HERE
getById, getBySlug example (for __name__s), create, update
*****/

// import { browserHistory } from 'react-router';

import callAPI from '../../global/utils/api';
//SINGLE __actionCase__ ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch single");
  const { byId, selected } = state.__name__;
  if(selected.id !== id) {
    console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(!byId[id]) {
    console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(selected.isFetching) {
    console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    console.log("Y shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED___actionCase__ = "INVALIDATE_SELECTED___actionCase__"
export function invalidateSelected() {
  return {
    type: INVALIDATE_SELECTED___actionCase__
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    console.log("SHOULD FETCH!");
    return dispatch(fetchSingle__PascalName__ById(id))
  } else {
    console.log("DON'T NEED TO FETCH");
    return dispatch(returnSingle__PascalName__Promise(id)); //return promise that contains __name__
  }
}

export const returnSingle__PascalName__Promise = (id) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object
  // EVEN IF we don't need to fetch it. this is because if we have any
  // .then()'s in the components, they will fail when we don't need to fetch.
  // This returns the object from the map so that we can do things with it in the component.
  console.log("return single without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_SINGLE___actionCase___WITHOUT_FETCHING"
      , id: id
      , item: getState().__name__.byId[id]
      , success: true
    })
  });
}

export const REQUEST_SINGLE___actionCase__ = "REQUEST_SINGLE___actionCase__";
function requestSingle__PascalName__(id) {
  return {
    type: REQUEST_SINGLE___actionCase__
    , id
  }
}

export const RECEIVE_SINGLE___actionCase__ = "RECEIVE_SINGLE___actionCase__";
function receiveSingle__PascalName__(json) {
  console.log("received", json.__name__._id);
  return {
    type: RECEIVE_SINGLE___actionCase__
    , id: json.__name__._id
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingle__PascalName__ById(__name__Id) {
  console.log("fetching");
  return dispatch => {
    dispatch(requestSingle__PascalName__(__name__Id))
    return callAPI(`/api/__name__s/${__name__Id}`)
      .then(json => dispatch(receiveSingle__PascalName__(json)))
  }
}

export const ADD_SINGLE___actionCase___TO_MAP = "ADD_SINGLE___actionCase___TO_MAP";
export function addSingle__PascalName__ToMap(item) {
  return {
    type: ADD_SINGLE___actionCase___TO_MAP
    , item
  }
}

export const REQUEST_CREATE___actionCase__ = "REQUEST_CREATE___actionCase__";
function requestCreate__PascalName__(__name__) {
  return {
    type: REQUEST_CREATE___actionCase__
    , __name__
  }
}

export const RECEIVE_CREATE___actionCase__ = "RECEIVE_CREATE___actionCase__";
function receiveCreate__PascalName__(json) {
  // console.log("RECEIVE_CREATE___actionCase__");
  // console.log(json);
  return {
    type: RECEIVE_CREATE___actionCase__
    , id: json.__name__ ? json.__name__._id : null
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreate__PascalName__(data) {
  console.log("sendCreate__PascalName__")
  return dispatch => {
    dispatch(requestCreate__PascalName__(data))
    return callAPI('/api/__name__s', 'POST', data)
      .then(json => dispatch(receiveCreate__PascalName__(json)))
  }
}

export const REQUEST_UPDATE___actionCase__ = "REQUEST_UPDATE___actionCase__";
function requestUpdate__PascalName__(__name__) {
  return {
    type: REQUEST_UPDATE___actionCase__
    , __name__
  }
}

export const RECEIVE_UPDATE___actionCase__ = "RECEIVE_UPDATE___actionCase__";
function receiveUpdate__PascalName__(json) {
  return {
    type: RECEIVE_UPDATE___actionCase__
    , id: json.__name__._id || null
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdate__PascalName__(data) {
  console.log(data._id);
  return dispatch => {
    dispatch(requestUpdate__PascalName__(data))
    return callAPI(`/api/__name__s/${data._id}`, 'PUT', data)
      .then(json => dispatch(receiveUpdate__PascalName__(json)))
  }
}

export const REQUEST_DELETE___actionCase__ = "REQUEST_DELETE___actionCase__";
function requestDelete__PascalName__(__name__Id) {
  return {
    type: REQUEST_DELETE___actionCase__
    , __name__Id
  }
}

export const RECEIVE_DELETE___actionCase__ = "RECEIVE_DELETE___actionCase__";
function receiveDelete__PascalName__(json) {
  return {
    type: RECEIVE_DELETE___actionCase__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  // console.log("Delete ", id);
  return dispatch => {
    dispatch(requestDelete__PascalName__(id))
    return callAPI(`/api/__name__s/${id}`, 'DELETE')
    .then(json => dispatch(receiveDelete__PascalName__(json)))
    /*** ACTION-BASED REDIRECT ***/
    // - use this for Delete by default
    .then((json) => {
      if(json.success) {
        console.log("success");
      } else {
        alert("ERROR");
      }
    })
  }
}

//__actionCase__ LIST ACTIONS
const findListFromArgs = (state, listArgs) => {
  //because we are nesting __name__Lists to arbitrary locations depths,
  // finding the list becomes a little bit harder
  // helper method to find list from listArgs
  var list = Object.assign({}, state.__name__.lists, {});
  for(var i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  //determine whether to fetch the list or not, from arbitrary listArgs
  // leaving console logs in here for later help debugging apps
  // console.log("shouldFetchList", listArgs);
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST", list);
  if(!list || !list.items) {
    console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.items.length < 1) {
    console.log("X shouldFetch - true: length 0");
    return true
  } else if(list.isFetching) {
    console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  // console.log("FETCH IF NEEDED", listArgs);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  if (shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(return__PascalName__ListPromise(...listArgs));
  }
}

export const return__PascalName__ListPromise = (...listArgs) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object
  // EVEN IF we don't need to fetch it. this is because if we have any
  // .then()'s in the components, they will fail when we don't need to fetch.
  console.log("return list without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN___actionCase___LIST_WITHOUT_FETCHING"
      , listArgs: listArgs
      , list: findListFromArgs(getState(), listArgs).items
      , success: true
    })
  });
}

export const REQUEST___actionCase___LIST = "REQUEST___actionCase___LIST"
function request__PascalName__List(listArgs) {
  return {
    type: REQUEST___actionCase___LIST
    , listArgs
  }
}

export const RECEIVE___actionCase___LIST = "RECEIVE___actionCase___LIST"
function receive__PascalName__List(json, listArgs) {
  return {
    type: RECEIVE___actionCase___LIST
    , listArgs
    , list: json.__name__s
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList(...listArgs) {
  console.log("FETCH __actionCase__ LIST", listArgs);
  return dispatch => {
    if(listArgs.length === 0) {
      listArgs = ["all"];
    }
    //default to "all" list if we don't pass any listArgs
    dispatch(request__PascalName__List(listArgs))
    //determine what api route we want to hit
    //HERE: use listArgs to determine what api call to make.
    // if listArgs[0] == null or "all", return list
    // if listArgs has 1 arg, return "/api/__name__s/by[ARG]"
    // if 2 args, return return "/api/__name__s/by-[ARG1]/[ARG2]". ex: /api/__name__s/by-user/:userId
    // if more than 2, will require custom checks
    let apiTarget = "/api/__name__s";
    // if(test) {} //override defaults here
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return callAPI(apiTarget).then(
      json => dispatch(receive__PascalName__List(json, listArgs))
    )
  }
}

export const ADD___actionCase___TO_LIST = "ADD___actionCase___TO_LIST";
export function add__PascalName__ToList(id, ...listArgs) {
  // console.log("Add __name__ to list", id);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: ADD___actionCase___TO_LIST
    , id
    , listArgs
  }
}

export const REMOVE___actionCase___FROM_LIST = "REMOVE___actionCase___FROM_LIST"
export function remove__PascalName__FromList(id, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ['all'];
  }
  return {
    type: REMOVE___actionCase___FROM_LIST
    , id
    , listArgs
  }
}

//LIST UTIL METHODS
export const SET___actionCase___FILTER = "SET___actionCase___FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET___actionCase___FILTER
    , filter
    , listArgs
  }
}

export const SET___actionCase___PAGINATION = "SET___actionCase___PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET___actionCase___PAGINATION
    , pagination
    , listArgs
  }
}

export const INVALIDATE___actionCase___LIST = "INVALIDATE___actionCase___LIST"
export function invalidateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: INVALIDATE___actionCase___LIST
    , listArgs
  }
}
