/**
 * Will create a new __camelName__ from information in the TextInputs
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
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
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as __camelName__Actions from '../__camelName__Actions'

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class Create__PascalName__ extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , __camelName__: _.cloneDeep(this.props.default__PascalName__.obj)
    }
    this._bind(
      '_goBack'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
    )
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(__camelName__Actions.fetchDefault__PascalName__());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      __camelName__: _.cloneDeep(nextProps.default__PascalName__.obj)
    })
  }

  _checkFormValid() {

    var requiredInputs = Object.keys(this.refs).filter((ref) => this.refs[ref].props.isRequired);

    var isValid = true;
    for(var i = 0; i < requiredInputs.length; i++) {

      var theVal = _.get(this.state, requiredInputs[i]);
      if(!theVal || theVal.length < 1) {
        isValid = false;
      }
    }

    this.setState({isFormValid: isValid});
  }

  _handleAction() {
    console.log("_handleAction fired");

    const { dispatch, user } = this.props;
    const { __camelName__ } = this.state;
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(__camelName__Actions.sendCreate__PascalName__(__camelName__)).then((res) => {
      dispatch(__camelName__Actions.add__PascalName__ToList(res.item._id));
      this.props.navigation.goBack();
    });
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    // console.log("input changed");
    this.setState(newState);
    this._checkFormValid();
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {
      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      var offset = 130;
      // console.log(offset);
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);
  }

  render() {

    const { navigator, isFetching } = this.props;
    const { __camelName__, isFormValid } = this.state;

    const isEmpty = !__camelName__; 

    const rightItem = {
      title: 'Cancel',
      onPress: this._goBack
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : null}
        contentContainerStyle={{flex:1}}
        style={YTStyles.container}
      >
        <YTHeader
          rightItem={rightItem}
          title="New __startName__"
        />
        { isEmpty ? 
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        :
          <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[YTStyles.formWrapper]}>
            <View>
              <View style={{padding: 5}}>
                <TextInput
                  autoCorrect={true}
                  isRequired={true}
                  onFocus={ (e) => this._scrollToInput(e, '__camelName__.name')}
                  onChange={ (e) => this._handleInputChange(e, "__camelName__.name") }
                  placeholder="Name"
                  placeholderTextColor={YTStyles.colors.accentText}
                  ref="__camelName__.name"
                  returnKeyType="next"
                  style={YTStyles.input}
                  value={this.state.__camelName__.name}
                />
              </View>
              <View style={YTStyles.listSeparator}/>
            </View>
            <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
              <YTButton
                caption={isFetching ? "Creating..." : "Create new __startName__"}
                isDisabled={!isFormValid}
                onPress={this._handleAction}
              />
            </View>
          </ScrollView>
        }
      </KeyboardAvoidingView>
    )
  }
}


const mapStoreToProps = (store) => {

  return {
    default__PascalName__: store.__camelName__.defaultItem
    , isFetching: store.__camelName__.selected.isFetching
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(Create__PascalName__);
