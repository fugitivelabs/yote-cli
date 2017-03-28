// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

function __Proper__ListItem({ __name__ }) {
  return (
    <li>
      <Link to={`/__kebabName__s/${__camelName__._id}`}> {__name__.name}</Link>
    </li>
  )
}

__Proper__ListItem.propTypes = {
  __name__: PropTypes.object.isRequired
}

export default __Proper__ListItem;
