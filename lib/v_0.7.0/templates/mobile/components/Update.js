/**
* Will update the name and description of an already existing __name__
*/

// import react things
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import Image from 'Image';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as __name__Actions from '../__name__Actions'

// import styles
import __name__Styles from '../__name__Styles';
import YTColors from '../../../global/styles/YTColors';

class Update__PascalName__ extends Base {
  constructor(props) {
    super(props);
    const { selected__PascalName__, __name__Map } = this.props;
    this.state = {
      isFormValid: false
      , new__PascalName__Data: __name__Map[selected__PascalName__.id] ? JSON.parse(JSON.stringify(__name__Map[selected__PascalName__.id])) : {}
    }
    this._bind(
      '_closeModal'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_openLibrary'
    )
  }

  _checkFormValid() {

    var requiredInputs = Object.keys(this.refs).filter((ref) => this.refs[ref].props.isRequired);

    var isValid = true;
    for(var i = 0; i < requiredInputs.length; i++) {

      // lodash to the rescue
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
    const { new__PascalName__Data } = this.state;
    console.log(new__PascalName__Data);
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(__name__Actions.sendUpdate__PascalName__(new__PascalName__Data)).then((res) => {
      dispatch(__name__Actions.invalidateList());
      dispatch(__name__Actions.fetchListIfNeeded());
      // console.log('done');
      // console.log(res);
      this.props.navigator.pop();
    });
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openLibrary() {
    this.props.navigator.push({library: true});
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
      console.log("on focus called ", refName);
      console.log(this.refs[refName].props.returnKeyType);
      var offset = 130;
      console.log(offset);
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
    const { new__PascalName__Data, isFormValid } = this.state;
    const leftItem = {
      title: 'Cancel',
      onPress: this._closeModal
    };

    return (
      <View style={__name__Styles.container} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Update __PascalName__"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" style={[__name__Styles.formWrapper]}>
          <View style={__name__Styles.cell}>

            <Text style={__name__Styles.new__PascalName__Header}>__PascalName__ Info</Text>
            <View style={__name__Styles.infoBox}>
              <View>
                <Text style={__name__Styles.label}>Title</Text>
                <TextInput
                  ref="new__PascalName__Data.title"
                  onFocus={ (e) => this._scrollToInput(e, 'new__PascalName__Data.title')}
                  isRequired={true}
                  style={__name__Styles.input}
                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "new__PascalName__Data.title") }
                  underlineColorAndroid={YTColors.anagada}
                  returnKeyType="go"
                  value={this.state.new__PascalName__Data.title}
                  onSubmitEditing={this._handleAction}
                />
              </View>
            </View>
          </View>

          <View style={__name__Styles.cell}>
            <Text style={__name__Styles.new__PascalName__Header}>__PascalName__ Description</Text>
            <View style={__name__Styles.infoBox}>
              <View>
                <Text style={__name__Styles.label}>Description</Text>
                <TextInput
                  ref="new__PascalName__Data.description"
                  onFocus={ (e) => this._scrollToInput(e, 'new__PascalName__Data.description')}
                  isRequired={true}
                  style={__name__Styles.input}
                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "new__PascalName__Data.description")}
                  returnKeyType="go"
                  value={this.state.new__PascalName__Data.description}
                  onSubmitEditing={this._handleAction}
                />
              </View>
            </View>
          </View>


          <View style={{padding: 10}}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Updating..." : "Update __name__"}

              isDisabled={!isFormValid}
            />

          </View>
        </ScrollView>
      </View>
    )


  }


}


const mapStoreToProps = (store) => {

  return {

    user: store.user.loggedIn.user,
    selected__PascalName__: store.__name__.selected,
    __name__Map: store.__name__.byId,
    isFetching: store.__name__.lists.all.isFetching,

  }
}

export default connect(mapStoreToProps)(Update__PascalName__);
