/**
 * View component for __kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ store
 */

// import primary libraries
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import __PascalName__Form from '../components/__PascalName__Form.jsx';
import __PascalName__Layout from '../components/__PascalName__Layout.jsx';

// import services
import { useCreate__PascalName__ } from '../__camelName__Service';

const Create__PascalName__ = () => {
  const history = useHistory();
  const location = useLocation();
  const { data: __camelName__, handleChange, handleSubmit, ...__camelName__Query } = useCreate__PascalName__({
    // optional, anything we want to add to the default object
    initialState: {
      // someKey: someValue
    }
    // optional, callback function to run when the server returns the new __camelName__
    , onResponse: (new__PascalName__, error) => {
      if(error || !new__PascalName__) {
        alert(error || 'An error occurred.')
        history.replace('/__kebabNamePlural__', location.state);
      } else {
        history.replace(`/__kebabNamePlural__/${new__PascalName__._id}`, location.state);
      }
    }
  });

  // render UI based on data and loading state
  return (
    <__PascalName__Layout title={'New __PascalName__'}>
      <WaitOn query={__camelName__Query}>
        <__PascalName__Form
          __camelName__={__camelName__}
          cancelLink='__kebabNamePlural__'
          disabled={__camelName__Query.isFetching}
          formType='create'
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </WaitOn>
    </__PascalName__Layout>
  )
}

export default Create__PascalName__;
