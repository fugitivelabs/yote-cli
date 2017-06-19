/*****
SINGLE __allCaps__ CRUD ACTIONS GO HERE
getById, getBySlug example (for __name__s), create, update
*****/

import { browserHistory } from 'react-router';

import callAPI from '../../global/util/api'
//SINGLE __allCaps__ ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch");
  const { map, selected } = state.__name__;
  if(selected.id !== id) {
    //TODO: we need more granularity here. we also don't want to fetch if the object is already in the map
    console.log("shouldFetch debug 0");
    return true;
  } else if(!map[id]) {
    console.log("shouldFetch debug 1");
    return true;
  } else if(selected.isFetching) {
    console.log("shouldFetch debug 2");
    return false;
  } else {
    console.log("shouldFetch debug 3");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED___allCaps__ = "INVALIDATE_SELECTED___allCaps__"
export function invalidateSelected() {
  return {
    type: INVALIDATE_SELECTED___allCaps__
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    console.log("SHOULD FETCH!");
    return dispatch(fetchSingle__Proper__ById(id))
  } else {
    console.log("DON'T NEED TO FETCH");
  }
}

export const REQUEST_SINGLE___allCaps__ = "REQUEST_SINGLE___allCaps__";
function requestSingle__Proper__(id) {
  return {
    type: REQUEST_SINGLE___allCaps__
    , id
  }
}

export const RECEIVE_SINGLE___allCaps__ = "RECEIVE_SINGLE___allCaps__";
function receiveSingle__Proper__(json) {
  console.log("received", json.__name__._id);
  return {
    type: RECEIVE_SINGLE___allCaps__
    , id: json.__name__._id
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingle__Proper__ById(__name__Id) {
  console.log("fetching");
  return dispatch => {
    dispatch(requestSingle__Proper__(__name__Id))
    return callAPI(`/api/__name__s/${__name__Id}`)
      .then(json => dispatch(receiveSingle__Proper__(json)))
  }
}

export const ADD_SINGLE___allCaps___TO_MAP = "ADD_SINGLE___allCaps___TO_MAP";
export function addSingle__Proper__ToMap(item) {
  return {
    type: ADD_SINGLE___allCaps___TO_MAP
    , item
  }
}

export const REQUEST_CREATE___allCaps__ = "REQUEST_CREATE___allCaps__";
function requestCreate__Proper__(__name__) {
  return {
    type: REQUEST_CREATE___allCaps__
    , __name__
  }
}

export const RECEIVE_CREATE___allCaps__ = "RECEIVE_CREATE___allCaps__";
function receiveCreate__Proper__(json) {
  console.log("RECEIVE_CREATE___allCaps__");
  console.log(json);
  return {
    type: RECEIVE_CREATE___allCaps__
    , id: json.__name__ ? json.__name__._id : null
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreate__Proper__(data) {
  console.log("sendCreate__Proper__")
  return dispatch => {
    dispatch(requestCreate__Proper__(data))
    return callAPI('/api/__name__s', 'POST', data)
      .then(json => dispatch(receiveCreate__Proper__(json)))
  }
}

export const REQUEST_UPDATE___allCaps__ = "REQUEST_UPDATE___allCaps__";
function requestUpdate__Proper__(__name__) {
  return {
    type: REQUEST_UPDATE___allCaps__
    , __name__
  }
}

export const RECEIVE_UPDATE___allCaps__ = "RECEIVE_UPDATE___allCaps__";
function receiveUpdate__Proper__(json) {
  return {
    type: RECEIVE_UPDATE___allCaps__
    , item: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdate__Proper__(data) {
  return dispatch => {
    dispatch(requestUpdate__Proper__(data))
    return callAPI(`/api/__name__s/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdate__Proper__(json)))
  }
}

export const REQUEST_DELETE___allCaps__ = "REQUEST_DELETE___allCaps__";
function requestDelete__Proper__(__name__Id) {
  return {
    type: REQUEST_DELETE___allCaps__
    , __name__Id
  }
}

export const RECEIVE_DELETE___allCaps__ = "RECEIVE_DELETE___allCaps__";
function receiveDelete__Proper__(json) {
  return {
    type: RECEIVE_DELETE___allCaps__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDelete__Proper__(id))
    return callAPI(`/api/__name__s/${id}`, 'DELETE')
    .then(json => dispatch(receiveDelete__Proper__(json)))
    /*** ACTION-BASED REDIRECT ***/
    // - use this for Delete by default
    .then((json) => {
      if(json.success) {
        browserHistory.push(`/__name__s`)
      } else {
        alert("ERROR");
      }
    })
  }
}

//__allCaps__ LIST ACTIONS

const shouldFetchList = (state, type) => {
  console.log("shouldFetchList");
  //types: "all", "published", etc
  const list = state.__name__.lists[type];
  if(!list || !list.items) {
    console.log("ERROR: CANNOT FIND LIST TYPE: " + type);
  } else if(list.items.length < 1) {
    console.log("shouldFetch debug 0");
    return true
  } else if(list.isFetching) {
    console.log("shouldFetch debug 1");
    return false
  } else {
    console.log("shouldFetch debug 2");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (type, id) => (dispatch, getState) => {
  if (shouldFetchList(getState(), type)) {
    if(type === "all") {
      return dispatch(fetchList());
    // } else if(type === "test") {
    //   //example with an additional byId argument
    //   return dispatch(fetchListByTest(id));
    } else {
      console.log("NO MATCHING LIST TYPE SPECIFIED");
      return false; //what to return here?
    }
  }
}

export const REQUEST___allCaps___LIST = "REQUEST___allCaps___LIST"
function request__Proper__List() {
  console.log('requesting __name__s list')
  return {
    type: REQUEST___allCaps___LIST
  }
}

export const RECEIVE___allCaps___LIST = "RECEIVE___allCaps___LIST"
function receive__Proper__List(json) {
  return {
    type: RECEIVE___allCaps___LIST
    , list: json.__name__s
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH __allCaps__ LIST");
  return dispatch => {
    dispatch(request__Proper__List())
    return callAPI('/api/__name__s')
      .then(json => dispatch(receive__Proper__List(json)))
  }
}

//MORE LIST TYPES HERE


//LIST UTIL METHODS
export const SET___allCaps___FILTER = "SET___allCaps___FILTER"
export function setFilter(listType, filter) {
  return {
    type: SET___allCaps___FILTER
    , filter
    , listType
  }
}

export const SET___allCaps___SORT = "SET___allCaps___SORT"
export function setSortBy(listType, sortBy) {
  return {
    type: SET___allCaps___SORT
    , sortBy
    , listType
  }
}

export const SET___allCaps___QUERY = "SET___allCaps___QUERY"
export function setQuery(listType, query) {
  return {
    type: SET___allCaps___QUERY
    , query
    , listType
  }
}

export const SET___allCaps___PAGINATION = "SET___allCaps___PAGINATION"
export function setPagination(listType, pagination) {
  return {
    type: SET___allCaps___PAGINATION
    , pagination
    , listType
  }
}

export const INVALIDATE___allCaps___LIST = "INVALIDATE___allCaps___LIST"
export function invalidateList(listType) {
  return {
    type: INVALIDATE___allCaps___LIST
    , listType
  }
}