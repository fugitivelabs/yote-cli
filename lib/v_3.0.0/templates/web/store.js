import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiUtils from '../../global/utils/api';

import {
  handleCreateFulfilled
  , handleFetchSinglePending
  , handleFetchSingleFulfilled
  , handleFetchSingleFromListFulfilled
  , handleFetchSingleRejected
  , handleFetchListPending
  , handleFetchListFulfilled
  , handleFetchListRejected
  , handleMutationPending
  , handleMutationFulfilled
  , handleMutationRejected
  , handleDeletePending
  , handleDeleteFulfilled
  , handleDeleteRejected
  , shouldFetch
  , INITIAL_STATE
  , handleInvalidateQuery
  , handleInvalidateQueries
  , handleAddSingleToList
} from '../../global/utils/storeUtils';


// First define all API calls for __camelName__
/**
 * The functions below, called thunks, allow us to perform async logic. They
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 * 
 * In practice we won't dispatch these directly, they will be dispatched by __camelName__Service which has a nicer api built on hooks.
 */

// CREATE
export const sendCreate__PascalName__ = createAsyncThunk(
  '__camelName__/sendCreate'
  , async (new__PascalName__) => {
    const endpoint = `/api/__kebabNamePlural__`;
    const response = await apiUtils.callAPI(endpoint, 'POST', new__PascalName__);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// READ
export const fetchSingle__PascalName__ = createAsyncThunk(
  '__camelName__/fetchSingle'
  , async (id) => {
    const endpoint = `/api/__kebabNamePlural__/${id}`;
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetch__PascalName__List = createAsyncThunk(
  '__camelName__/fetchList' // this is the action name that will show up in the console logger.
  , async (listArgs) => {
    const endpoint = `/api/__kebabNamePlural__?${listArgs}`;
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// for each resource we can add as many endpoints as we want in this format and we only need two actions to handle them.
// this will hit the same endpoint as the list version, but the store will handle the returned array and access the single item in it.
export const fetchSingle__PascalName__AtEndpoint = createAsyncThunk(
  '__camelName__/fetchSingleWithFilter' // this is the action name that will show up in the console logger.
  , async(endpointWithQuery) => {
    const endpoint = `/api/__kebabNamePlural__/${endpointWithQuery}`; // example: `/api/__kebabNamePlural__/logged-in?${queryString}`
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetch__PascalName__ListAtEndpoint = createAsyncThunk(
  '__camelName__/fetchListWithFilter' // this is the action name that will show up in the console logger.
  , async(endpointWithQuery) => {
    const endpoint = `/api/__kebabNamePlural__/${endpointWithQuery}`; // example: `/api/__kebabNamePlural__/logged-in?${queryString}`
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// UPDATE
export const sendUpdate__PascalName__ = createAsyncThunk(
  '__camelName__/sendUpdate'
  , async ({ _id, ...updates }) => {
    const endpoint = `/api/__kebabNamePlural__/${_id}`;
    const response = await apiUtils.callAPI(endpoint, 'PUT', updates);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// DELETE
export const sendDelete__PascalName__ = createAsyncThunk(
  '__camelName__/sendDelete'
  , async (id) => {
    const endpoint = `/api/__kebabNamePlural__/${id}`;
    const response = await apiUtils.callAPI(endpoint, 'DELETE');
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// next define the store's initial state, all of our store utils rely on a specific state shape, so use the constant
const initialState = { ...INITIAL_STATE };

// define the __camelName__Slice. This is a combination of actions and reducers. More info: https://redux-toolkit.js.org/api/createSlice
export const __camelName__Slice = createSlice({
  name: '__camelName__'
  , initialState
  /**
   * The `reducers` field lets us define reducers and generate associated actions.
   * Unlike the selectors defined at the bottom of this file, reducers only have access
   * to this specific reducer and not the entire store.
   * 
   * Again, we will not dispatch these directly, they will be dispatched by __camelName__Service.
   */
  , reducers: {
    invalidateQuery: handleInvalidateQuery
    , invalidateQueries: handleInvalidateQueries
    , add__PascalName__ToList: handleAddSingleToList
  }

  /**
   * The `extraReducers` field lets the slice handle actions defined elsewhere,
   * including actions generated by createAsyncThunk or in other slices.
   * We'll use them to track our server request status.
   * 
   * We'll add a case for each API call defined at the top of the file to dictate
   * what happens during each API call lifecycle.
   */
  , extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(sendCreate__PascalName__.fulfilled, handleCreateFulfilled)

      // READ
      .addCase(fetchSingle__PascalName__.pending, handleFetchSinglePending)
      .addCase(fetchSingle__PascalName__.fulfilled, handleFetchSingleFulfilled)
      .addCase(fetchSingle__PascalName__.rejected, handleFetchSingleRejected)
      .addCase(fetch__PascalName__List.pending, handleFetchListPending)
      // because lists are returned from the server named for their resource, we need to pass a `listKey` so the util can properly handle the response
      .addCase(fetch__PascalName__List.fulfilled, (state, action) => handleFetchListFulfilled(state, action, '__camelNamePlural__'))
      .addCase(fetch__PascalName__List.rejected, handleFetchListRejected)

      // permission protected single fetches
      .addCase(fetchSingle__PascalName__AtEndpoint.pending, handleFetchSinglePending)
      // these endpoints return named lists, we need to pass a `listKey` so the util can properly handle the response
      .addCase(fetchSingle__PascalName__AtEndpoint.fulfilled, (state, action) => handleFetchSingleFromListFulfilled(state, action, '__camelNamePlural__'))
      .addCase(fetchSingle__PascalName__AtEndpoint.rejected, handleFetchSingleRejected)
      // permission protected list fetches
      .addCase(fetch__PascalName__ListAtEndpoint.pending, handleFetchListPending)
      .addCase(fetch__PascalName__ListAtEndpoint.fulfilled, (state, action) => handleFetchListFulfilled(state, action, '__camelNamePlural__'))
      .addCase(fetch__PascalName__ListAtEndpoint.rejected, handleFetchListRejected)

      // UPDATE
      .addCase(sendUpdate__PascalName__.pending, handleMutationPending)
      .addCase(sendUpdate__PascalName__.fulfilled, handleMutationFulfilled)
      .addCase(sendUpdate__PascalName__.rejected, handleMutationRejected)
      // .addCase(sendUpdate__PascalName__.fulfilled, (state, action) => handleMutationFulfilled(state, action, (newState, action) => {
      //   // by passing this optional callback we now have access to the new state if we want to do something else with it, this works for all reducer handlers
      // }))

      // DELETE
      .addCase(sendDelete__PascalName__.pending, handleDeletePending)
      .addCase(sendDelete__PascalName__.fulfilled, handleDeleteFulfilled)
      .addCase(sendDelete__PascalName__.rejected, handleDeleteRejected)
  }
});

// export the actions for the reducers defined above
export const { invalidateQuery, invalidateQueries, add__PascalName__ToList } = __camelName__Slice.actions;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchListIfNeeded = (queryKey, listFetch = fetch__PascalName__List) => (dispatch, getState) => {
  const groupQuery = getState().group.listQueries[queryKey];
  if(shouldFetch(groupQuery)) {
    // console.log('Fetching group list', queryKey);
    dispatch(listFetch(queryKey));
  } else {
    // console.log('No need to fetch, fresh query in cache');
  }
};

export const fetchSingleIfNeeded = (id, singleFetch = fetchSingle__PascalName__) => (dispatch, getState) => {
  const groupQuery = getState().group.singleQueries[id];
  if(shouldFetch(groupQuery)) {
    dispatch(singleFetch(id));
  } else {
    // console.log('No need to fetch, fresh query in cache');
  }
}

export default __camelName__Slice.reducer;
