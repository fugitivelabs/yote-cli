/**
 * Reusable stateless form component for __Proper__
 */

// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput } from '../../../global/components/forms';

function __Proper__Form({
  cancelLink
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , __name__
}) {

  // set the button text
  const buttonText = formType === "create" ? "Create __Proper__" : "Update __Proper__";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="__name__Form" className="card __name__-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="name"
              label="Name"
              value={__name__.name}
              change={handleFormChange}
              placeholder="Name (required)"
              required={true}
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

__Proper__Form.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , __name__: PropTypes.object.isRequired
}

__Proper__Form.defaultProps = {
  formTitle: ''
}

export default __Proper__Form;
