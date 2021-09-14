// import primary libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import global components
import ListItem from '../../../global/components/base/ListItem'
import Button from '../../../global/components/base/Button'

// import services
import { useGet__PascalName__ById } from '../__camelName__Service'

const __PascalName__ListItem = ({ id }) => {
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(id)

  if(__camelName__Query.isLoading) return <Skeleton />
  if(__camelName__Query.isError) return <ListItem>An error occurred 😬 <Button onClick={__camelName__Query.refetch}>Refetch</Button></ListItem>
  if(!__camelName__) return <ListItem>No __camelName__ found</ListItem>

  return (
    <ListItem className={__camelName__Query.isFetching ? "opacity-50" : ""}>
      <Link to={`/__kebabNamePlural__/${__camelName__._id}`}>{__camelName__.name}</Link>
    </ListItem>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <ListItem className="animate-pulse">
      <div className="w-6/12 h-4 bg-gray-500"></div>
    </ListItem>
  )
}
// add the skeleton to the component so we can access it in other components (__PascalName__List in this case)
__PascalName__ListItem.Skeleton = Skeleton

__PascalName__ListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default __PascalName__ListItem