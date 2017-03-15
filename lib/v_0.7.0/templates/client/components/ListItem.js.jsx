import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const __Proper__ListItem = ({ __name__ }) => {

  return (
    <li>

      <Link to={`/__name__s/${__name__._id}`}> {__name__.title}</Link>

    </li>
  )
}

__Proper__ListItem.propTypes = {
  __name__: PropTypes.object.isRequired
}

export default __Proper__ListItem;
