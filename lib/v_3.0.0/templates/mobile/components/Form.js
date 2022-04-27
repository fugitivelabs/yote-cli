/**
 * Reusable stateless form component for __PascalName__
 */

// import react things
// import React from 'react';
// import PropTypes from 'prop-types';

// // import react-native things
// import {
//   KeyboardAvoidingView
//   , Platform
//   , ScrollView
//   , TextInput
//   , View
// } from 'react-native'; 

// // import global components
// import YTButton from '../../../global/buttons/YTButton';
// import YTTextInput from '../../../global/inputs/YTTextInput';

// // import styles 
// import tw from '../../../global/styles/tailwind/twrnc'; 

// const __PascalName__Form = ({
//   disabled
//   , formTitle
//   , formType
//   , handleFormChange
//   , handleFormSubmit
//   , __camelName__
// }) => {

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? "padding" : null}
//       contentContainerStyle={tw`flex-1`}
//       style={tw`flex-1 bg-white`}
//     >
//       <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
//         <View style={tw`p-2`}>
//           <TextInput
//             autoCorrect={true}
//             isRequired={true}
//             onChange={(e) => handleFormChange(e, 'name')}
//             placeholder="Name"
//             placeholderTextColor={tw.style('tintAccent')}
//             returnKeyType="next"
//             style={tw`p-2 text-lg border-b border-gray-100`} 
//             value={__camelName__.name || ""}
//           />
//         </View>
//         <View style={tw`px-2 py-4`}>
//           <YTButton
//             caption={formType == "update" ? "Update __PascalName__" : "Create new __PascalName__"}
//             isDisabled={disabled}
//             onPress={() => handleFormSubmit(__camelName__)}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   )
// }

// __PascalName__Form.propTypes = {
//   disabled: PropTypes.bool
//   , formTitle: PropTypes.string
//   , formType: PropTypes.string.isRequired
//   , handleFormChange: PropTypes.func.isRequired
//   , handleFormSubmit: PropTypes.func.isRequired
//   , __camelName__: PropTypes.object.isRequired
// }

// __PascalName__Form.defaultProps = {
//   disabled: false
//   , formTitle: ''
// }

// export default __PascalName__Form;


/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  KeyboardAvoidingView
  , Platform
  , ScrollView
  , View
} from 'react-native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTTextInput from '../../../global/inputs/YTTextInput';

// import styles
import tw from '../../../global/styles/tailwind/twrnc';

const __PascalName__Form = ({
  disabled
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , __camelName__
}) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : null}
      contentContainerStyle={tw`flex-1`}
      style={tw`flex-1 bg-white`}
    >
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View style={tw`p-2`}>
          <YTTextInput
            autoCorrect={true}
            isRequired={true}
            name="name"
            onChange={handleFormChange}
            placeholder="Name"
            placeholderTextColor={tw.style('tintAccent')}
            returnKeyType="next"
            style={tw`p-2 text-lg border-b border-gray-100`}
            value={__camelName__.name || ""}
          />
        </View>
        <View style={tw`px-2 py-4`}>
          <YTButton
            caption={formType == "update" ? "Update __camelName__" : "Create new __camelName__"}
            isDisabled={disabled}
            onPress={handleFormSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

__PascalName__Form.propTypes = {
  disabled: PropTypes.bool
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , __camelName__: PropTypes.object.isRequired
}

__PascalName__Form.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default __PascalName__Form;
