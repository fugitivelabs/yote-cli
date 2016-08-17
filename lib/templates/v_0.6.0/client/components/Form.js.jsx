import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, TextAreaInput, CheckboxInput } from '../../../global/components/forms';

const __Proper__Form = ({__name__, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle }) => {
  const buttonText = formType === "create" ? "Create __Proper__" : "Update __Proper__";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;
  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="__name__Form" className="card __name__-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="title"
              label="Title"
              value={__name__.title}
              change={handleFormChange}
              placeholder="Title (required)"
              required={true}
              />
            <TextAreaInput
              name="description"
              label="Description"
              value={__name__.description}
              change={handleFormChange}
              required={false}
              placeholder="This is where the content goes..."
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
  __name__: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
}

export default __Proper__Form;
