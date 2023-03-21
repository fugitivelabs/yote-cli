/**
 * This set of hooks is how we'll interact with the __camelName__Store. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useSelector, useDispatch } from 'react-redux'
import apiUtils from '../../global/utils/api';
import { parseQueryArgs, selectSingleById } from '../../global/utils/storeUtils';

// import all of the actions from the store
import {
  fetch__PascalName__List
  , fetch__PascalName__ListAtEndpoint
  , fetchListIfNeeded
  , fetchSingle__PascalName__
  , fetchSingle__PascalName__AtEndpoint
  , sendCreate__PascalName__
  , sendUpdate__PascalName__
  , sendDelete__PascalName__
  , invalidateQuery
  // , invalidateQueries
  , add__PascalName__ToList
  , fetchSingleIfNeeded
} from './__camelName__Store';
import {
  useGetResourceById
  , useGetResource
  , useGetResourceList
  , useMutateResource
} from '../../global/utils/serviceHooks';


// Define the hooks that we'll use to manage data in the components

// CREATE

/**
 * Use this hook to handle the creation of a new __camelName__.
 * @param {Object} initialState - The initial state of the __camelName__ (optional)
 * @param {Function} handleResponse - The function to call when the __camelName__ is successfully created
 * 
 * @returns an object containing fetch info and the following:
 * - `new__PascalName__` as `data`: the new __camelName__ object as it currently exists in state, initially the default __camelName__
 * - `handleChange`: standard form change handler to be used in the form
 * - `handleSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // access the create action and fetch the default __camelName__
 * const { data: new__PascalName__, handleChange, handleSubmit, ...__camelName__Query } = useCreate__PascalName__({
 *   // optional, anything we want to add to the default object
 *   initialState: {
 *     someKey: 'someValue'
 *   }
 *   // optional, callback function that receives the response from the server
 *   , handleResponse: (__camelName__, error) => {
 *     if(error || !__camelName__) {
 *       alert(error || "An error occurred.")
 *     }
 *     history.push(`/__kebabNamePlural__/${__camelName__._id}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={__camelName__Query}>
 *     <__PascalName__Form
 *       __camelName__={__camelName__}
 *       handleSubmit={handleSubmit}
 *       handleChange={handleChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useCreate__PascalName__ = ({ initialState = {}, onResponse = () => { } }) => {
  const dispatch = useDispatch();
  // set up __camelName__ specific stuff to be used by the shared hook
  const default__PascalName__Query = useGetDefault__PascalName__();
  const sendMutation = (mutated__PascalName__) => dispatch(sendCreate__PascalName__(mutated__PascalName__));

  // the hook will return everything the caller needs to create a new __camelName__
  return useMutateResource({ resourceQuery: default__PascalName__Query, sendMutation, initialState, onResponse });
}

// READ

/**
 * NOTE: If you are using this because you want to create a new __camelName__, try `useCreate__PascalName__`
 * instead. It handles everything for you!
 * 
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the default__PascalName__ (as `data`)
 * @returns a refetch function for convenience (will probably never be used for default __camelName__, but keeps things consistent)
 */
export const useGetDefault__PascalName__ = (forceFetch = false) => {
  // leverage existing hooks to get the default __camelName__ (using 'default' as the id will return the default __camelName__ from the server)
  return useGet__PascalName__ById('default', forceFetch);
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
  // set up __camelName__ specific stuff to be used by the shared hook
  const __camelName__Store = useSelector(({ __camelName__ }) => __camelName__);
  const fetch__PascalName__ = forceFetch ? fetchSingle__PascalName__ : fetchSingleIfNeeded;
  const sendFetchById = (id) => dispatch(fetch__PascalName__(id));
  const sendInvalidateSingle = (id) => dispatch(invalidateQuery(id));

  // return the (now __camelName__ specific) hook
  return useGetResourceById({ id, fromStore: __camelName__Store, sendFetchById, sendInvalidateSingle });

}

/**
 * This hook will check for a fresh __camelName__ in the store and fetch a new one if necessary
 * 
 * @param {...string | object | null} args - accepts two optional arguments: a string (endpoint) or an object (listArgs) or both as (endpoint, listArgs)
 * @returns an object containing fetch info and eventually the __camelName__ (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
 export const useGet__PascalName__ = (...args) => {
  const dispatch = useDispatch();
  const { endpoint, listArgs } = parseQueryArgs(args);
 // set up __camelName__ specific stuff to be used by the shared hook
 const __camelName__Store = useSelector(({ __camelName__ }) => __camelName__);
 const fetch__PascalName__ = endpoint ? fetchSingle__PascalName__AtEndpoint : fetchSingle__PascalName__;
 const sendFetchSingle = (queryString) => dispatch(fetchSingleIfNeeded(queryString, fetch__PascalName__));
 const sendInvalidateSingle = (queryString) => dispatch(invalidateQuery(queryString));
 // return the (now __camelName__ specific) hook
 return useGetResource({ listArgs, fromStore: __camelName__Store, sendFetchSingle, sendInvalidateSingle, endpoint });
}

/**
 * This hook will check for a fresh list in the store and fetch a new one if necessary
 * 
 * @param {...string | object | null} args - accepts two optional arguments: a string (endpoint) or an object (listArgs) or both as (endpoint, listArgs)
 * @returns an object containing fetch info and eventually the __camelName__ list (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGet__PascalName__List = (...args) => {
  const dispatch = useDispatch();
  const { endpoint, listArgs } = parseQueryArgs(args);
  // set up __camelName__ specific stuff to be used by the shared hook
  const __camelName__Store = useSelector(({ __camelName__ }) => __camelName__);
  // if an endpoint was passed in, use that, otherwise use the default
  const fetch__PascalNamePlural__ = endpoint ? fetch__PascalName__ListAtEndpoint : fetch__PascalName__List;
  const fetch__PascalNamePlural__IfNeeded = (queryString) => fetchListIfNeeded(queryString, fetch__PascalNamePlural__);
  const sendFetchList = (queryString) => dispatch(fetch__PascalNamePlural__IfNeeded(queryString));
  const sendInvalidateList = (queryString) => dispatch(invalidateQuery(queryString));

  // return the (now __camelName__ specific) hook
  return useGetResourceList({ listArgs, fromStore: __camelName__Store, sendFetchList, sendInvalidateList, endpoint });
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
 * Use this hook to handle the update of an existing __camelName__.
 * @param {string} id - the id of the __camelName__ to be updated.
 * @param {Object} options - an object that expects an optional onResponse function that receives the updated __camelName__ and error.
 * 
 * @returns an object containing fetch info and the following:
 * - `__camelName__` as `data`: the __camelName__ object as it currently exists in state
 * - `handleChange`: standard form change handler to be used in the form
 * - `handleSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // fetch the __camelName__ and access everything needed to handle updating it
 * const { data: __camelName__, handleChange, handleSubmit, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id, {
 *   // optional, callback function to run after the request is complete
 *   onResponse: (updated__PascalName__, error) => {
 *     if(error || !updated__PascalName__) {
 *       alert(error || "An error occurred.")
 *     }
 *     history.push(`/__kebabNamePlural__/${__camelName__Id}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={__camelName__Query}>
 *     <__PascalName__Form
 *       __camelName__={__camelName__}
 *       handleSubmit={handleSubmit}
 *       handleChange={handleChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useGetUpdatable__PascalName__ = (id, { onResponse = () => { } } = {}) => {
  const dispatch = useDispatch();
  // set up __camelName__ specific stuff to be used by the shared hook
  // use the existing hook to get the __camelName__Query
  const __camelName__Query = useGet__PascalName__ById(id);
  const sendMutation = (mutated__PascalName__) => dispatch(sendUpdate__PascalName__(mutated__PascalName__));
  // return the (now __camelName__ specific) hook
  return useMutateResource({ resourceQuery: __camelName__Query, sendMutation, onResponse });

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
    // return the delete action
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
  const __camelName__ = useSelector(({ __camelName__: __camelName__Store }) => selectSingleById(__camelName__Store, id));
  return __camelName__
}
