/**
 * Wraps all __PascalName__ components in a default container. If you want to
 * give all __PascalName__ views a sidebar for example, you would set that here.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Binder from '../../../global/Binder.js.jsx';
import DefaultLayout from "../../../global/layouts/DefaultLayout.js.jsx";

class __PascalName__Layout extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout>
        {this.props.children}
      </DefaultLayout>
    )
  }
}

export default __PascalName__Layout;
