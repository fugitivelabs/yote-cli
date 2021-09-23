/**
 * View component for /__kebabNamePlural__/:__camelName__Id
 *
 * Displays a single __camelName__ from the 'byId' map in the __camelName__ reducer
 */

// import primary libraries
import React from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'

// import services
import { useGet__PascalName__ById } from '../__camelName__Service'

// import resource components
import __PascalName__Layout from '../components/__PascalName__Layout.jsx'

const Single__PascalName__ = () => {
  // get location. Below is equivalent to const location = this.props.location
  const location = useLocation()

  // get the __camelName__ id from the url. Below is equivalent to const { __camelName__Id } = this.props.match.params
  const { __camelName__Id } = useParams()

  // get the __camelName__ from the store (or fetch it from the server)
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(__camelName__Id)

  return (
    <__PascalName__Layout title={'Single __PascalName__'}>
      <WaitOn query={__camelName__Query} fallback={<Skeleton />}>
        <div className={__camelName__Query.isFetching ? "opacity-50" : ""}>
          <h2>__PascalName__ details</h2>
          <h1> {__camelName__?.name} </h1>
        </div>
      </WaitOn>
      <Link to={`${location.pathname}/update`}>Update __PascalName__</Link>
    </__PascalName__Layout>
  )
}

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <p className="w-48 h-5 bg-gray-400"/>
      <p className="h-1"/>
      <p className="w-64 h-5 bg-gray-400" />
      <p className="h-1"/>
    </div>
  )
}

export default Single__PascalName__
