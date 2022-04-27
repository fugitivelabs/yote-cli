/**
 * This set of hooks is how we'll interact with the __camelName__Store. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

 import { useEffect, useState } from 'react';
 import { useSelector, useDispatch } from 'react-redux'
 import { usePagination } from '../../global/utils/customHooks';
 
 import apiUtils from '../../global/utils/api';
 
 import {
   selectListItems
   , selectSingleById
   , selectQuery
 } from '../../global/utils/storeUtils';
 
 // import all of the actions from the store
 import {
   fetch__PascalName__List
   , fetchListIfNeeded
   , fetchSingle__PascalName__
   , sendCreate__PascalName__
   , sendUpdate__PascalName__
   , sendDelete__PascalName__
   , invalidateQuery
   , invalidateQueries
   , add__PascalName__ToList
   , fetchSingleIfNeeded
 } from './__camelName__Store';
 
 
 // Define the hooks that we'll use to manage data in the components
 
 // CREATE
 
 /**
  * Use this hook to handle the creation of a new __camelName__.
  * @param {Object} initialState - The initial state of the __camelName__ (optional)
  * @param {Function} handleResponse - The function to call when the __camelName__ is successfully created
  * 
  * @returns an object containing fetch info and the following:
  * - `new__PascalName__` as `data`: the new __camelName__ object as it currently exists in state, initially the default __camelName__
  * - `handleFormChange`: standard form change handler to be used in the form
  * - `handleFormSubmit`: standard form submit handler to be used in the form
  * - `setFormState`: a way to handle form state changes in the component instead of `handleFormChange`, rarely needed but sometimes necessary
  * @example // to use in a component
  * // access the create action and fetch the default __camelName__
  * const { data: new__PascalName__, handleFormChange, handleFormSubmit, ...__camelName__Query } = useCreate__PascalName__({
  *   // optional, anything we want to add to the default object
  *   initialState: {
  *     someKey: 'someValue'
  *   }
  *   // optional, callback function that receives the response from the server
  *   , handleResponse: (__camelName__, error) => {
  *     if(error || !__camelName__) {
  *       alert(error.message || "An error occurred.")
  *     }
  *     history.push(`/__camelName__s/${__camelName__._id}`)
  *   }
  * });
  * 
  * return (
  *   <WaitOn query={__camelName__Query}>
  *     <__PascalName__Form
  *       __camelName__={__camelName__}
  *       handleFormSubmit={handleFormSubmit}
  *       handleFormChange={handleFormChange}
  *     />
  *   </WaitOn>
  * )
  */
 export const useCreate__PascalName__ = ({ initialState = {}, onResponse = () => { } }) => {
   const dispatch = useDispatch();
   // STATE
   // set up a state variable to hold the __camelName__, start with what was passed in as initialState (or an empty object)
   const [new__PascalName__, setFormState] = useState(initialState);
   // set up a state variable to hold the isCreating flag
   const [isCreating, setIsCreating] = useState(false)
 
   // FETCH
   // use the existing hook to get the default __camelName__
   const { data: default__PascalName__, ...default__PascalName__Query } = useGetDefault__PascalName__();
 
   useEffect(() => {
     // once we have the default __camelName__, set it to state
     if(default__PascalName__) {
       // override default values with anything that was passed as initialState
       setFormState((currentState) => {
         return { ...default__PascalName__, ...currentState }
       });
     }
   }, [default__PascalName__])
 
   // FORM HANDLERS
   // setFormState will replace the entire __camelName__ object with the new __camelName__ object
   // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
   const handleFormChange = e => {
     setFormState(currentState => {
       return { ...currentState, [e.target.name]: e.target.value }
     });
   }
 
   const handleFormSubmit = e => {
     // prevent the default form submit event if present
     e?.preventDefault && e.preventDefault();
     // set isCreating true so the component knows we're waiting on a response
     setIsCreating(true)
     // dispatch the create action
     dispatch(sendCreate__PascalName__(new__PascalName__)).then(response => {
       // set isCreating false so the component knows we're done waiting on a response
       setIsCreating(false)
       // send the response to the callback function
       onResponse(response.payload, response.error);
     })
   }
 
   // return everything the component needs to create a new __camelName__
   return {
     data: new__PascalName__
     , handleFormChange
     , handleFormSubmit
     , setFormState // only used if we want to handle this in a component, will usually use handleFormChange
     , ...default__PascalName__Query
     // override isFetching if we're waiting for the new __camelName__ to get returned (for ui purposes)
     , isFetching: isCreating || default__PascalName__Query.isFetching
   }
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
 
   useEffect(() => {
     if(id) {
       // only fetch if we need to
       if(forceFetch) {
         dispatch(fetchSingle__PascalName__(id));
       } else {
         dispatch(fetchSingleIfNeeded(id));
       }
     } else {
       // no id yet, don't attempt fetch
       // console.log("still waiting for __PascalName__ id");
     }
     // this is the dependency array. useEffect will run anytime one of these changes
   }, [id, forceFetch, dispatch]);
 
   // get the query status from the store
   const { status, error } = useSelector(({ __camelName__: __camelName__Store }) => selectQuery(__camelName__Store, id));
   // get current __camelName__ data (if it exists)
   const __camelName__ = useSelector(({ __camelName__: __camelName__Store }) => selectSingleById(__camelName__Store, id));
 
   const isFetching = status === 'pending' || status === undefined;
   const isLoading = isFetching && !__camelName__;
   const isError = status === 'rejected';
   const isSuccess = status === 'fulfilled';
   const isEmpty = isSuccess && !__camelName__;
 
   // return the info for the caller of the hook to use
   return {
     data: __camelName__
     , error
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
 
   // first make sure all list args are present. If any are undefined we will wait to fetch.
   const readyToFetch = apiUtils.checkListArgsReady(listArgs);
 
   // handle pagination right here as part of the fetch so we don't have to call usePagination every time from each component
   // this also allows us to pre-fetch the next page(s)
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
     if(readyToFetch) {
       if(forceFetch) {
         dispatch(fetch__PascalName__List(queryString));
       } else {
         dispatch(fetchListIfNeeded(queryString));
       }
     } else {
       // listArgs aren't ready yet, don't attempt fetch
       // console.log("still waiting for listArgs");
     }
   }, [readyToFetch, queryString, forceFetch, dispatch]);
 
   // get the query info from the store
   const { status, error, totalPages, ids } = useSelector(({ __camelName__: __camelName__Store }) => selectQuery(__camelName__Store, queryString));
 
   // get current list items (if they exist)
   const __camelName__s = useSelector(({ __camelName__: __camelName__Store }) => selectListItems(__camelName__Store, queryString));
 
   const isFetching = status === 'pending' || status === undefined;
   const isLoading = isFetching && !__camelName__s;
   const isError = status === 'rejected';
   const isSuccess = status === 'fulfilled';
   const isEmpty = isSuccess && !__camelName__s.length;
 
   // add totalPages from the query to the pagination object
   pagination.totalPages = totalPages || 0;
 
   // PREFETCH
   // if we are using pagination we can fetch the next page(s) now
   const nextQueryString = readyToFetch && listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;
 
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
     , data: __camelName__s
     , error
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
 
 
 /**
  * This hook is designed to be used by a FLatList component for infinite scrolling.
  * It will fetch the next page of __camelName__s and add them to the array when `getNextPage` is called.
  * 
  * @param {object} listArgs - an object used to construct the query
  * @param {boolean} forceFetch - optional override to force a fetch from the server
  * @returns an object containing fetch info and eventually the __camelName__ list (as `data`)
  * @returns a `refresh` and `getNextPage` function designed to be used by FlatList
  */
 export const useInfinite__PascalName__List = (listArgs, forceFetch = false) => {
   const dispatch = useDispatch();
   // check force fetch to determine which action to use
   const fetch__PascalName__s = (query) => {
     if(forceFetch) return dispatch(fetch__PascalName__List(query));
     return dispatch(fetchListIfNeeded(query));
   }
 
   // keep track of the query keys so we can invalidate all pages on refresh
   const [queryKeys, setQueryKeys] = useState([]);
 
   // use the existing hook to control pagination
   const { page, per, setPage } = usePagination({ page: 1, per: 20 });
 
   // this will hold the accumulated pages of __camelName__s. Each time page changes (and a fetch is made) the __camelName__s will be added to this list. Each time the query changes the list will be cleared.
   const [__camelName__List, set__PascalName__s] = useState([]);
 
   // these will be updated on each fetch and returned to the component
   const [isFetching, setIsFetching] = useState(false);
   const [totalPages, setTotalPages] = useState(0);
   const [totalCount, setTotalCount] = useState(0);
   const [error, setError] = useState(null);
   const isLoading = isFetching && !__camelName__List.length;
   const isError = !!error
   const isEmpty = !isFetching && !__camelName__List.length;
 
   // every time query changes reset the list and set the page to 1
   useEffect(() => {
     reset__PascalName__List();
   }, [listArgs, per]);
 
   // every time page changes fetch more __camelName__s and add them to the list
   useEffect(() => {
     fetchNext__PascalName__s();
   }, [page]);
 
   const fetchNext__PascalName__s = () => {
     // if we're already fetching, don't do anything
     if(isFetching) return;
     // time to fetch next, clear any error and set fetching to true
     setError(null)
     setIsFetching(true);
     const __camelName__Query = apiUtils.queryStringFromObject({ ...listArgs, page, per });
     // add the new query string to the array
     setQueryKeys(keys => ([...keys, __camelName__Query]));
     // use the action defined at the top to fetch the next page
     fetch__PascalName__s(__camelName__Query).then(__camelName__Res => {
       const { __camelName__s: next__PascalName__s = [], totalPages: nextTotalPages, totalCount: nextTotalCount, error } = __camelName__Res.payload;
       // add the new __camelName__s to the list
       setError(error);
       set__PascalName__s((current__PascalName__s) => [...current__PascalName__s, ...next__PascalName__s]);
       setTotalPages(nextTotalPages || 1);
       setTotalCount(nextTotalCount);
       setIsFetching(false);
     })
   }
 
   const reset__PascalName__List = () => {
     // clear the list and reset the page
     set__PascalName__s([]);
     if(page != 1) {
       // when page changes `fetchNext__PascalName__s` will be called
       setPage(1);
     } else {
       // still on first page, fetch manually
       fetchNext__PascalName__s();
     }
   }
 
   // to be used in a component
   const getNextPage = () => {
     const currentDataHasLoaded = !isFetching && __camelName__List.length > 0;
     const nextPageExists = page < totalPages;
     // when page changes `fetchNext__PascalName__s` will be called
     if(currentDataHasLoaded && nextPageExists) setPage(page + 1);
   }
 
   // to be used in a component
   const refresh = () => {
     dispatch(invalidateQueries(queryKeys))
     // clear current set of query keys
     setQueryKeys([]);
     reset__PascalName__List();
   }
 
   return {
     data: __camelName__List
     , isFetching
     , isLoading
     , isError
     , isEmpty
     , error
     , refresh
     , getNextPage
     , totalCount
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
  * Use this hook to handle the update of an existing __camelName__.
  * @param {string} id - the id of the __camelName__ to be updated.
  * @param {Object} options - an object that expects an optional onResponse function that receives the updated __camelName__ and error.
  * 
  * @returns an object containing fetch info and the following:
  * - `__camelName__` as `data`: the __camelName__ object as it currently exists in state
  * - `handleFormChange`: standard form change handler to be used in the form
  * - `handleFormSubmit`: standard form submit handler to be used in the form
  * - `setFormState`: a way to handle form state changes in the component instead of `handleFormChange`, rarely needed but sometimes necessary
  * @example // to use in a component
  * // fetch the __camelName__ and access everything needed to handle updating it
  * const { data: __camelName__, handleFormChange, handleFormSubmit, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id, {
  *   // optional, callback function to run after the request is complete
  *   onResponse: (updated__PascalName__, error) => {
  *     if(error || !updated__PascalName__) {
  *       alert(error.message || "An error occurred.")
  *     }
  *     history.push(`/__camelName__s/${__camelName__Id}`)
  *   }
  * });
  * 
  * return (
  *   <WaitOn query={__camelName__Query}>
  *     <__PascalName__Form
  *       __camelName__={__camelName__}
  *       handleFormSubmit={handleFormSubmit}
  *       handleFormChange={handleFormChange}
  *     />
  *   </WaitOn>
  * )
  */
 export const useGetUpdatable__PascalName__ = (id, { onResponse = () => { } } = {}) => {
   const dispatch = useDispatch();
   // STATE
   // set up a state variable to hold the __camelName__, start with an empty object
   const [updated__PascalName__, setFormState] = useState({});
 
   // FETCH
   // use the existing hook to get the __camelName__
   const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(id);
 
   useEffect(() => {
     // once we have the __camelName__, set it to state
     // this will also run when the update request is complete, because `__camelName__` will be updated, which is nice
     if(__camelName__) {
       setFormState({ ...__camelName__ });
     }
   }, [__camelName__])
 
   // FORM HANDLERS
   // setFormState will replace the entire __camelName__ object with the new __camelName__ object
   // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
   const handleFormChange = e => {
     setFormState(currentState => {
       return { ...currentState, [e.target.name]: e.target.value }
     });
   }
 
   const handleFormSubmit = e => {
     // prevent the default form submit event if present
     e?.preventDefault && e.preventDefault();
     // dispatch the update action then send the response to the callback function (successful or not)
     dispatch(sendUpdate__PascalName__(updated__PascalName__)).then(response => {
       onResponse(response.payload, response.error);
     });
   }
 
   return {
     data: updated__PascalName__
     , handleFormChange
     , handleFormSubmit
     , setFormState // only used if we want to handle this in a component, will usually use handleFormChange
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
 