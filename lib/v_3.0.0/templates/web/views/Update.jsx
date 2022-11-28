/**
 * View component for /__kebabNamePlural__/:__camelName__Id/update
 *
 * Updates a single __camelName__ from a copy of the __camelName__ from the __camelName__ store
 */

// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props
import { useParams, useHistory, useLocation } from 'react-router-dom';

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import __PascalName__Layout from '../components/__PascalName__Layout.jsx';
import __PascalName__Form from '../components/__PascalName__Form.jsx';

// import services
import { useGetUpdatable__PascalName__ } from '../__camelName__Service';

const Update__PascalName__ = () => {
  const history = useHistory();
  const location = useLocation();
  const { __camelName__Id } = useParams();
  const { data: __camelName__, handleChange, handleSubmit, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id, {
    // optional, callback function to run after the request is complete
    onResponse: (updated__PascalName__, error) => {
      if(error || !updated__PascalName__) {
        alert(error || 'An error occurred.');
      }
      history.replace(`/__kebabNamePlural__/${__camelName__Id}`, location.state);
    }
  });

  // render UI based on data and loading state
  return (
    <__PascalName__Layout title={'Update __PascalName__'}>
      <WaitOn query={__camelName__Query}>
        <__PascalName__Form
          __camelName__={__camelName__}
          cancelLink={`/__kebabNamePlural__/${__camelName__Id}`}
          disabled={__camelName__Query.isFetching}
          formType='update'
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </WaitOn>
    </__PascalName__Layout>
  )
}

export default Update__PascalName__;
