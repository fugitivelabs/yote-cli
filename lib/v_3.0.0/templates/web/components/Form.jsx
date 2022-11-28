/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import global components

// import form components
import { TextInput } from '../../../global/components/forms'

const __PascalName__Form = ({
  cancelLink
  , disabled
  , formTitle
  , formType
  , handleChange
  , handleSubmit
  , __camelName__
}) => {

  // set the button text
  const buttonText = formType === 'create' ? 'Create __startName__' : 'Update __startName__'

  // set the form header
  const header = formTitle ? <div className=""><h2> {formTitle} </h2><hr /></div> : <div />

  return (
    <div className="">
      <form name='__camelName__Form' className="" onSubmit={handleSubmit}>
        {header}
        <TextInput
          name='name'
          label='Name'
          value={__camelName__.name || ''}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <Link
          to={cancelLink}
        >
          Cancel
        </Link>
        <button
          disabled={disabled}
          type='submit'
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}

__PascalName__Form.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , disabled: PropTypes.bool
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleChange: PropTypes.func.isRequired
  , handleSubmit: PropTypes.func.isRequired
  , __camelName__: PropTypes.object.isRequired
}

__PascalName__Form.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default __PascalName__Form

