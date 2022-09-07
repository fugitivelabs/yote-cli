/**
 * View component for /__kebabNamePlural__
 *
 * Generic __camelName__ list view. Defaults to 'all' with:
 * const { data:  __camelNamePlural__ } = useGet__PascalName__List({})
 *
 */
// import primary libraries
import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
import PaginatedList from '../../../global/components/base/PaginatedList';
import WaitOn from '../../../global/components/helpers/WaitOn'

// import resource components
import __PascalName__ListItem from '../components/__PascalName__ListItem.jsx'
import __PascalName__Layout from '../components/__PascalName__Layout.jsx'

// import services
import { useGet__PascalName__List } from '../__camelName__Service'

const __PascalName__List = () => {
  const initialPagination = { page: 1, per: 5 }
  const queryArgs = {
    ...initialPagination
    // add other key:value pairs here to narrow the query
    //, name: "some specific name"
  }
  const { data: __camelNamePlural__, ids, pagination, ...__camelName__Query } = useGet__PascalName__List(queryArgs);

  return (
    <__PascalName__Layout title={'__PascalName__ List'}>
      <h1>__PascalName__ List</h1>
      <Link to="/__kebabNamePlural__/new">New __PascalName__</Link>
      <PaginatedList
        pagination={pagination}
        className={`${__camelName__Query.isFetching ? 'opacity-50' : ''}`}
      >
        <WaitOn query={__camelName__Query} fallback={<Skeleton count={pagination.per} />}>
          {__camelNamePlural__?.map(__camelName__ => <__PascalName__ListItem key={__camelName__._id} id={__camelName__._id} />)}
          {/* {ids?.map(__camelName__Id => <__PascalName__ListItem key={__camelName__Id} id={__camelName__Id} />)} */}
        </WaitOn>
      </PaginatedList>
    </__PascalName__Layout>
  )
}

const Skeleton = ({ count = 5 }) => {
  const items = new Array(count).fill('__kebabName__-list-item-skeleton');
  return items.map((name, index) => <__PascalName__ListItem.Skeleton key={`${name} ${index}`} />)
}


export default __PascalName__List
