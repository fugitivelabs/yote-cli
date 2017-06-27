/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput } from '../../../global/components/forms';

function __PascalName__Form({
  cancelLink
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , __name__
}) {

  // set the button text
  const buttonText = formType === "create" ? "Create __PascalName__" : "Update __PascalName__";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="__name__Form" className="__name__-form" onSubmit={handleFormSubmit}>
            <TextInput
              change={handleFormChange}
              label="Name"
              name="name"
              placeholder="Name (required)"
              required={true}
              value={__name__.name}
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

__PascalName__Form.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , __name__: PropTypes.object.isRequired
}

__PascalName__Form.defaultProps = {
  formTitle: ''
}

export default __PascalName__Form;
