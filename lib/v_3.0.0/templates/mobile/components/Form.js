/**
 * Reusable stateless form component for __PascalName__
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator
  , Alert
  , Image
  , KeyboardAvoidingView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';

import YTStyles from '../../../global/styles/YTStyles';

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
      contentContainerStyle={{flex: 1}}
      style={YTStyles.container}
    >
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[YTStyles.formWrapper]}>
        <View>
          <View style={{padding: 5}}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              onChange={(e) => handleFormChange(e, 'name')}
              placeholder="Name"
              placeholderTextColor={YTStyles.colors.accentText}
              returnKeyType="next"
              style={YTStyles.input}
              value={__camelName__.name || ""}
              // onFocus={ (e) => this._scrollToInput(e, '__camelName__.name')}
              // onSubmitEditing={(event) => {
              //   this.refs['__camelName__.description'].focus();
              // }}
              // ref="__camelName__.name"
            />
          </View>
          {/* <View style={YTStyles.separator}/>
          <View style={{padding: 5}}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              multiline={true}
              onChange={(e) => handleFormChange(e, 'description')}
              onSubmitEditing={handleFormSubmit}
              placeholder="Write a description..."
              placeholderTextColor={YTStyles.colors.accentText}
              returnKeyType="go"
              style={[YTStyles.input, {minHeight: 90}]}
              value={__camelName__.description || ""}
              // onFocus={ (e) => this._scrollToInput(e, '__camelName__.description')}
              // ref="__camelName__.description"
            />
          </View> */}
          <View style={YTStyles.separator}/>
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          <YTButton
            caption={formType == "update" ? "Update __PascalName__" : "Create new __PascalName__"}
            isDisabled={disabled}
            onPress={() => handleFormSubmit(__camelName__)}
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
