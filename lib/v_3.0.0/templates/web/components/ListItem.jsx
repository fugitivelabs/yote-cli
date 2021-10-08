// import primary libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import services
import { useGet__PascalName__ById } from '../__camelName__Service'

const __PascalName__ListItem = ({ id }) => {
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(id)

  if(__camelName__Query.isLoading) return <Skeleton />
  if(__camelName__Query.isError) return <li>An error occurred 😬 <button onClick={__camelName__Query.refetch}>Refetch</button></li>
  if(!__camelName__) return <li>No __camelName__ found</li>

  return (
    <li className={__camelName__Query.isFetching ? "opacity-50" : ""}>
      <Link to={`/__kebabNamePlural__/${__camelName__._id}`}>{__camelName__.name}</Link>
    </li>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <li className="animate-pulse">
      <p>...</p>
    </li>
  )
}
// add the skeleton to the component so we can access it in other components (__PascalName__List in this case)
__PascalName__ListItem.Skeleton = Skeleton

__PascalName__ListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default __PascalName__ListItem