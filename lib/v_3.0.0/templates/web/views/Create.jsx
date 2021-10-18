/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ store
 */

// import primary libraries
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'

// import resource components
import __PascalName__Form from '../components/__PascalName__Form.jsx'
import __PascalName__Layout from '../components/__PascalName__Layout.jsx'

// import services
import { useCreate__PascalName__ } from '../__camelName__Service'

const Create__PascalName__ = () => {
  const history = useHistory()
  const { data: default__PascalName__, sendCreate__PascalName__, ...default__PascalName__Query } = useCreate__PascalName__()

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating(boolean) is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false)

  const handleFormSubmit = async (new__PascalName__) => {
    // set isCreating true to disable the form while wait for the new __camelName__ to get returned
    setIsCreating(true)
    const { payload: __camelName__, error } = await sendCreate__PascalName__(new__PascalName__) // replaces dispatch(__camelName__Actions.sendCreate__PascalName__(new__PascalName__)).then(__camelName__Res => ...)
    setIsCreating(false)
    if(error) {
      alert(error.message || "An error occurred.")
      history.push(`/__kebabNamePlural__`)
    } else {
      history.push(`/__kebabNamePlural__/${__camelName__._id}`)
    }
  }

  // render UI based on data and loading state
  return (
    <__PascalName__Layout title={'New __PascalName__'}>
      <WaitOn query={default__PascalName__Query}>
      { default__PascalName__ &&
        // we have the default__PascalName__, render the form
        <__PascalName__Form
          __camelName__={default__PascalName__}
          cancelLink='/__kebabNamePlural__'
          disabled={default__PascalName__Query.isFetching || isCreating}
          formType='create'
          handleFormSubmit={handleFormSubmit}
        />
      }
      </WaitOn>
    </__PascalName__Layout>
  )
}

export default Create__PascalName__
