// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import __camelName__ css modules
import __camelName__Styles from '../__camelName__ModuleStyles.css';

function __PascalName__ListItem({ __camelName__ }) {
  return (
    <li>
      <Link to={`/__kebabName__s/${__camelName__._id}`}> {__camelName__.name}</Link>
    </li>
  )
}

__PascalName__ListItem.propTypes = {
  __camelName__: PropTypes.object.isRequired
}

export default __PascalName__ListItem;
