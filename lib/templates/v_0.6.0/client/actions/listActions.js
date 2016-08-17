/*****

LIST ACTIONS GO HERE

*****/

import fetch from 'isomorphic-fetch'

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
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH __allCaps__ LIST");
  return dispatch => {
    dispatch(request__Proper__List())
    return fetch('/api/__name__s', {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.__name__s.length; i++) {
            itemMap[json.__name__s[i]._id] = json.__name__s[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receive__Proper__List(json)))
  }
}
