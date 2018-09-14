/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { TextInput } from '../../../../global/forms';

const  Admin__PascalName__Form = ({
  cancelLink
  , formHelpers
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , __camelName__
}) => {

  // set the button text
  const buttonText = formType === "create" ? "Create __startName__" : "Update __startName__";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="__camelName__Form" className="__camelName__-form" onSubmit={handleFormSubmit}>
            {header}
            <TextInput
              change={handleFormChange}
              label="Name"
              name="__camelName__.name"
              placeholder="Name (required)"
              required={true}
              value={__camelName__.name}
            />
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={cancelLink}>Cancel</Link>
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Admin__PascalName__Form.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formHelpers: PropTypes.object
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , __camelName__: PropTypes.object.isRequired
}

Admin__PascalName__Form.defaultProps = {
  formHelpers: {}
  , formTitle: ''
}

export default Admin__PascalName__Form;
