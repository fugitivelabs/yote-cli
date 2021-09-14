/**
 * View component for /__kebabNamePlural__/:__camelName__Id/update
 *
 * Updates a single __camelName__ from a copy of  the __camelName__ from the __camelName__ reducer
 */

// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props
import { useParams, useHistory } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'

// import resource components
import __PascalName__Layout from '../components/__PascalName__Layout.jsx'
import __PascalName__Form from '../components/__PascalName__Form.jsx'

// import services
import { useGetUpdatable__PascalName__ } from '../__camelName__Service'

const Update__PascalName__ = () => {
  const history = useHistory() // get history object
  const { __camelName__Id } = useParams() // replaces match.params.__camelName__Id

  // fetches and returns the __camelName__ and the update action wrapped in dispatch.
  // another benefit of using this version is that __camelName__Query.isFetching will be true while the update is being processed by the server.
  const { sendUpdate__PascalName__, data: __camelName__, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id)

  const handleFormSubmit = updated__PascalName__ => {
    // send the updated__PascalName__ to the server
    sendUpdate__PascalName__(updated__PascalName__)
    // back to single __camelName__ view. We don't have to wait for the update to finish. It's okay if the __camelName__ is still updating when the user gets to the single __camelName__ view.
    history.push(`/__kebabNamePlural__/${updated__PascalName__._id}`)
  }

  return (
    <__PascalName__Layout title={'Update __PascalName__'}>
      <WaitOn query={__camelName__Query}>
        { __camelName__ &&
          // we have the __camelName__, render the form
          <__PascalName__Form
            __camelName__={__camelName__}
            cancelLink={`/__kebabNamePlural__/${__camelName__Id}`}
            disabled={__camelName__Query.isFetching}
            formType="update"
            handleFormSubmit={handleFormSubmit}
          />
        }
      </WaitOn>
    </__PascalName__Layout>
  )
}

export default Update__PascalName__


