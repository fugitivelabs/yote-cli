/**
 * This set of hooks is how we'll interact with the __camelName__Store. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usePagination } from '../../global/utils/customHooks';

import apiUtils from '../../global/utils/api';

// import all of the actions from the store
import {
  selectListItems
  , fetch__PascalName__List
  , fetchListIfNeeded
  , selectSingleById
  , fetchSingle__PascalName__
  , fetchDefault__PascalName__
  , sendCreate__PascalName__
  , sendUpdate__PascalName__
  , sendDelete__PascalName__
  , invalidateQuery
  , add__PascalName__ToList
  , selectQuery
  , fetchSingleIfNeeded
} from './__camelName__Store';


// Define the hooks that we'll use to manage data in the components

// CREATE

/**
 * Use this hook to access the default__PascalName__ and the sendCreate__PascalName__ action
 * 
 * @returns an object containing the dispatched `sendCreate__PascalName__` action and the fetch for the default __camelName__
 * @example // to use in a component
 * // access the create action and fetch the default __camelName__
 * const { sendCreate__PascalName__, data: default__PascalName__, ...__camelName__Query } = useCreate__PascalName__();
 * // dispatch the create action
 * sendCreate__PascalName__(new__PascalName__);
 */
export const useCreate__PascalName__ = () => {
  const dispatch = useDispatch();
  const default__PascalName__Fetch = useGetDefault__PascalName__();
  // return the default __camelName__ fetch and the sendCreate__PascalName__ action
  return {
    sendCreate__PascalName__: (new__PascalName__) => dispatch(sendCreate__PascalName__(new__PascalName__))
    , ...default__PascalName__Fetch
  }
}

// READ

/**
 * NOTE: If you are using this because you want to create a new __camelName__, try `useCreate__PascalName__`
 * instead. It returns the default__PascalName__ and the `sendCreate__PascalName__` action in one go.
 * 
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the default__PascalName__ (as `data`)
 * @returns a refetch function for convenience (will probably never be used for default __camelName__, but keeps things consistent)
 */
export const useGetDefault__PascalName__ = (forceFetch = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch the default __camelName__ if required
    if(forceFetch) {
      dispatch(fetchDefault__PascalName__())
    } else {
      dispatch(fetchSingleIfNeeded('default__PascalName__'))
    }
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [forceFetch, dispatch]);

  // get the query status from the store
  const { status } = useSelector(store => selectQuery(store, 'default__PascalName__'));

  // get current item (if it exists)
  const default__PascalName__ = useSelector((store) => selectSingleById(store, 'default__PascalName__'));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !default__PascalName__;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !default__PascalName__;
   
  // return the info for the caller of the hook to use
  return {
    data: default__PascalName__
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , refetch: () => dispatch(fetchDefault__PascalName__())
  }
}

/**
 * This hook will check for a fresh __camelName__ in the store and fetch a new one if necessary
 * 
 * @param {string} id - the id of the __camelName__ to be fetched
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the __camelName__ (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGet__PascalName__ById = (id, forceFetch = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch if we need to
    if(forceFetch) {
      dispatch(fetchSingle__PascalName__(id));
    } else {
      dispatch(fetchSingleIfNeeded(id))
    }
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [id, forceFetch, dispatch]);

  // get the query status from the store
  const { status } = useSelector(store => selectQuery(store, id));
  // get current __camelName__ data (if it exists)
  const __camelName__ = useSelector((store) => selectSingleById(store, id));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !__camelName__;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !__camelName__;

  // return the info for the caller of the hook to use
  return {
    data: __camelName__
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(id))
    , refetch: () => dispatch(fetchSingle__PascalName__(id))
  }
}

/**
 * This hook will check for a fresh list in the store and fetch a new one if necessary
 * 
 * @param {object} listArgs - an object used to construct the query
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the __camelName__ list (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGet__PascalName__List = (listArgs = {}, forceFetch = false) => {
  const dispatch = useDispatch();
  /**
  * NOTE: tracking lists using the query string is easy because the `listArgs` passed into
  * dispatch(fetch__PascalName__List(listArgs)) are accessed in the store by using action.meta.arg.
  * We could try setting the queryKey to something different (or nesting it) but we'd need to figure
  * out how to access that info in the store. Maybe by passing it along as a named object like:
  * 
  * dispatch(fetch__PascalName__List({queryString: listArgs, queryKey: someParsedVersionOfListArgs}))
  * 
  */

  // handle pagination right here as part of the fetch so we don't have to call usePagination every time from each component
  // this also allows us to prefetch the next page(s)
  let { page, per } = listArgs;
  let pagination = usePagination({ page, per });

  if(page && per) {
    listArgs.page = pagination.page;
    listArgs.per = pagination.per;
  } else {
    pagination = {};
  }

  // convert the query object to a query string for the new server api
  // also makes it easy to track the lists in the reducer by query string
  const queryString = apiUtils.queryStringFromObject(listArgs) || "all";
  // console.log('queryString', queryString);

  useEffect(() => {
    if(forceFetch) {
      dispatch(fetch__PascalName__List(queryString));
    } else {
      dispatch(fetchListIfNeeded(queryString));
    }
  }, [queryString, forceFetch, dispatch]);

  // get the query info from the store
  const { status, totalPages, ids } = useSelector(store => selectQuery(store, queryString));

  // get current list items (if they exist)
  const __camelNamePlural__ = useSelector((store) => selectListItems(store, queryString));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !__camelNamePlural__;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !__camelNamePlural__.length;

  if(totalPages) {
    // add totalPages from the query to the pagination object
    pagination.totalPages = totalPages;
  }

  // PREFETCH

  // if we are using pagination we can fetch the next page(s) now
  const nextQueryString = listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;

  useEffect(() => {
    if(nextQueryString) {
      // fetch the next page now
      dispatch(fetchListIfNeeded(nextQueryString))
    }
  }, [nextQueryString, dispatch]);

  // END PREFETCH

  // return the info for the caller of the hook to use
  return {
    ids
    , data: __camelNamePlural__
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(queryString))
    , refetch: () => dispatch(fetch__PascalName__List(queryString))
    , pagination
  }
}

// UPDATE

/**
 * Use this hook to access the `sendUpdate__PascalName__` action
 * 
 * Useful if you want to update a __camelName__ that you already have access to
 * 
 * NOTE: Check out `useGetUpdatable__PascalName__` if you want to fetch and update a __camelName__
 * 
 * @returns the sendUpdate__PascalName__ action wrapped in dispatch
 * @example // to use in a component
 * // access the update action
 * const { sendUpdate__PascalName__ } = useUpdate__PascalName__();
 * // dispatch the update action
 * sendUpdate__PascalName__(updated__PascalName__);
 */
export const useUpdate__PascalName__ = () => {
  const dispatch = useDispatch();
  return {
    // return the update action
    sendUpdate__PascalName__: (updated__PascalName__) => dispatch(sendUpdate__PascalName__(updated__PascalName__))
  }
}

/**
 * Use this hook to fetch a __camelName__ and access the `sendUpdate__PascalName__` action
 * 
 * Under the hood it combines `useGet__PascalName__ById` and `useUpdate__PascalName__` in a more convenient package
 * 
 * @param {string} id - the id of the __camelName__ to be fetched and updated.
 * @returns an object containing the sendUpdate__PascalName__ function and the fetch for the __camelName__ id passed in
 * @example // to use in a component
 * // access the update action and fetch the __camelName__
 * const { sendUpdate__PascalName__, data: __camelName__, ...__camelName__Query } = useUpdate__PascalName__(__camelName__Id);
 * // dispatch the update action
 * sendUpdate__PascalName__(updated__PascalName__);
 */
export const useGetUpdatable__PascalName__ = (id) => {
  // use the existing hook to fetch the __camelName__
  const __camelName__Query = useGet__PascalName__ById(id);
  // use the existing hook to access the update action
  const { sendUpdate__PascalName__ } = useUpdate__PascalName__();
  return {
    // return the update action and the __camelName__ fetch
    sendUpdate__PascalName__: sendUpdate__PascalName__
    , ...__camelName__Query
  }
}

// DELETE

/**
 * Use this hook to access the `sendDelete__PascalName__` action
 * 
 * @returns the sendDelete__PascalName__ action wrapped in dispatch
 * 
 * @example // to use in a component
 * // access the delete action
 * const { sendDelete__PascalName__ } = useDelete__PascalName__();
 * // dispatch the delete action
 * sendDelete__PascalName__(__camelName__Id);
 */
export const useDelete__PascalName__ = () => {
  const dispatch = useDispatch();
  return {
    // return the update action
    sendDelete__PascalName__: (id) => dispatch(sendDelete__PascalName__(id))
  }
}

// OTHERS

/**
 * @returns the `add__PascalName__ToList` action wrapped in dispatch
 */
export const useAdd__PascalName__ToList = () => {
  const dispatch = useDispatch();
  return {
    add__PascalName__ToList: (__camelName__Id, listArgs) => dispatch(add__PascalName__ToList({ id: __camelName__Id, queryKey: apiUtils.queryStringFromObject(listArgs) || "all" }))
  }
}

/**
 * NOTE: Only use this if you're sure the __camelName__ is already in the store. WILL NOT fetch from the server.
 * @param {string} id - the id of the __camelName__ that you want to grab from the store
 * @returns the __camelName__ from the store's byId map
 */
export const use__PascalName__FromMap = (id) => {
  const __camelName__ = useSelector((store) => selectSingleById(store, id));
  return __camelName__
}
