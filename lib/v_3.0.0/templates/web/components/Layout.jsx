/**
 * Wraps all __PascalName__ views in a wrapping container. If you want to give all
 * __PascalName__ views a sidebar for example, you would set that here.
 * 
 * Accepts a "title" prop and passes it down to be used by React Helmet on the DefaultLayout.
 * This allows us to easily update the browser tab title on each view.
 */

// import primary libraries
import React from 'react'
import PropTypes from 'prop-types'

// import global components
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.jsx'

const __PascalName__Layout = ({ children, className, title }) => {
  return (
    <DefaultLayout title={title} className={className}>
      {children}
    </DefaultLayout>
  )
}

__PascalName__Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node)
    , PropTypes.node
  ]).isRequired
  , className: PropTypes.string
  , title: PropTypes.string
}

__PascalName__Layout.Skeleton = DefaultLayout.Skeleton;

export default __PascalName__Layout;
