/*****

SINGLE __allCaps__ CRUD ACTIONS GO HERE
getById, getByIdAndPopulate, getBySlug example (for __name__s), create, update

*****/


import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';


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
    , __name__: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingle__Proper__ById(__name__Id) {
  return dispatch => {
    dispatch(requestSingle__Proper__(__name__Id))
    return fetch(`/api/__name__s/${__name__Id}`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveSingle__Proper__(json)))
  }
}


/***************

POPULATE POINTERS FROM SERVER

***************/

export const REQUEST_AND_POPULATE_SINGLE___allCaps__ = "REQUEST_AND_POPULATE_SINGLE___allCaps__";
function requestAndPopulateSingle__Proper__(id) {
  return {
    type: REQUEST_AND_POPULATE_SINGLE___allCaps__
    , id
  }
}

export const RECEIVE_POPULATED_SINGLE___allCaps__ = "RECEIVE_POPULATED_SINGLE___allCaps__";
function receivePopulatedSingle__Proper__(json) {
  console.log("received", json.__name__._id);
  return {
    type: RECEIVE_POPULATED_SINGLE___allCaps__
    , id: json.__name__._id
    , __name__: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function fetchAndPopulateSingle__Proper__ById(__name__Id) {
  return dispatch => {
    dispatch(requestAndPopulateSingle__Proper__(__name__Id))
    return fetch(`/api/__name__s/${__name__Id}/populate`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receivePopulatedSingle__Proper__(json)))
  }
}




/***************

CREATE ACTIONS

***************/

export const SETUP_NEW___allCaps__ = "SETUP_NEW___allCaps__";
export function setupNew__Proper__() {
  return {
    type: SETUP_NEW___allCaps__
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
  return {
    type: RECEIVE_CREATE___allCaps__
    , __name__: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function sendCreate__Proper__(data) {
  console.log("sendCreate__Proper__")
  console.log(data);
  return dispatch => {
    dispatch(requestCreate__Proper__(data))
    return fetch('/api/__name__s', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreate__Proper__(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   if(json.success) {
    //     browserHistory.push(`/__name__s/${json.__name__._id}`)
    //   } else {
    //     alert("ERROR");
    //   }
    // })
  }
}


/***************

UPDATE ACTIONS

***************/


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
    , __name__: json.__name__
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}



export function sendUpdate__Proper__(data) {
  return dispatch => {
    dispatch(requestUpdate__Proper__(data))
    return fetch(`/api/__name__s/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdate__Proper__(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   if(json.success) {
    //     browserHistory.push(`/__name__s/${json.__name__._id}`)
    //   } else {
    //     alert("ERROR");
    //   }
    // })
  }
}



/***************

DELETE ACTIONS

***************/

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
    return fetch(`/api/__name__s/${id}`, {
      method: 'DELETE'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
    })
    .then(res => res.json())
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
