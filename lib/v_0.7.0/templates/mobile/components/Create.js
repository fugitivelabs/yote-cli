/**
* Will create a new __name__ from information in the TextInputs
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

class Create__PascalName__ extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , __name__: JSON.parse(JSON.stringify(this.props.default__PascalName__))
    }
    this._bind(
      '_closeModal'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_openLibrary'
    )

  }

  componentDidMount() {
    this.refs['new__PascalName__.title'].focus();
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
    const { new__PascalName__ } = this.state;
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(__name__Actions.sendCreate__PascalName__(new__PascalName__)).then((res) => {
      dispatch(__name__Actions.add__PascalName__ToList(res.item._id));
      // console.log('done');
      // console.log(res);
      this.props.navigator.pop();
    });
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openLibrary() {
    this.refs['new__PascalName__.title'].blur();
    this.props.navigator.push({library: true});
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    console.log("input changed");
    this.setState(newState);
    this._checkFormValid();
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {

      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      // console.log("on focus called ", refName);
      // console.log(this.refs[refName].props.returnKeyType);
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
    const { new__PascalName__, isFormValid } = this.state;
    const leftItem = {
      title: 'Cancel',
      onPress: this._closeModal
    };
    const rightItem = {
      title: 'Import',
      onPress: this._openLibrary
    }

    return (
      <View style={__name__Styles.container} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Create __PascalName__"
        />
      <ScrollView ref="myScrollView" keyboardDismissMode="interactive" style={[__name__Styles.formWrapper]}>
          <View style={__name__Styles.cell}>
            <Text style={__name__Styles.new__PascalName__Header}>__PascalName__ Info</Text>
            <View style={__name__Styles.infoBox}>
              <View>
                <Text style={__name__Styles.label}>Title</Text>
                <TextInput
                  ref="new__PascalName__.title"
                  onFocus={ (e) => this._scrollToInput(e, 'new__PascalName__.title')}
                  isRequired={true}
                  style={__name__Styles.input}
                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "new__PascalName__.title") }
                  returnKeyType="go"
                  value={this.state.new__PascalName__.title}
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
                  ref="new__PascalName__.description"
                  onFocus={ (e) => this._scrollToInput(e, 'new__PascalName__.description')}
                  isRequired={true}
                  style={__name__Styles.input}
                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "new__PascalName__.description")}
                  returnKeyType="go"
                  value={this.state.new__PascalName__.description}
                  onSubmitEditing={this._handleAction}
                />
              </View>
            </View>
          </View>
          <View style={{padding: 10}}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Creating..." : "Create new __name__"}
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
    isFetching: store.__name__.selected.isFetching,

  }
}

export default connect(mapStoreToProps)(Create__PascalName__);
