/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ store
 */

// import primary libraries
import React, { useState, useEffect } from 'react'
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

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating(boolean) is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false)
  const [new__PascalName__, set__PascalName__] = useState({});
  const { data: default__PascalName__, sendCreate__PascalName__, ...default__PascalName__Query } = useCreate__PascalName__();

  useEffect(() => {
    // once we have the default __camelName__, set it to state
    if(default__PascalName__) {
      set__PascalName__(default__PascalName__);
    }
  }, [default__PascalName__])

  // set__PascalName__ will replace the entire __camelName__ object with the new __camelName__ object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    // both ways below accomplish the same thing.
    set__PascalName__({ ...new__PascalName__, [e.target.name]: e.target.value });
    // if we didn't have direct access to `new__PascalName__` we could use this where we can access __camelName__ as the current state
    // set__PascalName__(current__PascalName__State => {
    //   return { ...current__PascalName__State, [e.target.name]: e.target.value }
    // });

  }

  const handleFormSubmit = async e => {
    e.preventDefault();
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
        <__PascalName__Form
          __camelName__={new__PascalName__}
          cancelLink='/__kebabNamePlural__'
          disabled={default__PascalName__Query.isFetching || isCreating}
          formType='create'
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </__PascalName__Layout>
  )
}

export default Create__PascalName__
