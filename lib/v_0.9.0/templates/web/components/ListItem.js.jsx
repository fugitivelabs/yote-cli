// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const __PascalName__ListItem = ({
  __camelName__
}) => {
  return (
    <li>
      <Link to={`/__kebabNamePlural__/${__camelName__._id}`}> {__camelName__.name}</Link>
    </li>
  )
}

__PascalName__ListItem.propTypes = {
  __camelName__: PropTypes.object.isRequired
}

export default __PascalName__ListItem;
