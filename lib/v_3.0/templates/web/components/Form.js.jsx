/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Button from '../../../global/components/base/Button';

// import hooks
import { useFormState } from '../../../global/utils/customHooks';

// import form components
import { TextInput } from '../../../global/components/forms'

const __PascalName__Form = ({
  cancelLink
  , disabled
  , formTitle
  , formType
  , handleFormSubmit
  , __camelName__
}) => {

  // use the helper to handle __camelName__ state
  const [updated__PascalName__, handleChange] = useFormState(__camelName__) // pass __camelName__ as initialState

  // set the button text
  const buttonText = formType === "create" ? "Create __startName__" : "Update __startName__"

  // set the form header
  const header = formTitle ? <div className=""><h2> {formTitle} </h2><hr /></div> : <div />
  
  const handleSubmit = e => {
    e.preventDefault()
    handleFormSubmit(updated__PascalName__)
  }

  return (
    <div className="">
      <form name="__camelName__Form" className="" onSubmit={handleSubmit}>
        {header}
        <TextInput
          name="name"
          label="Name"
          value={updated__PascalName__.name || ""}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <div className="">
          <div className="">
            <Button
              disabled={disabled}
              link={cancelLink}
              skin="white"
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              type="submit"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

__PascalName__Form.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , disabled: PropTypes.bool
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , __camelName__: PropTypes.object.isRequired
}

__PascalName__Form.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default __PascalName__Form

