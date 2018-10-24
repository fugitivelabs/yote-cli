/**
 * __PascalName__ component called from TabsView
 * sends __camelName__List as props to __PascalName__TitleList component for the ListView datasource
 */

// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components & apis
import {
  ActivityIndicator
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import ActionButton from '../../../global/buttons/ActionButton';
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import module components
import __PascalName__List from '../components/__PascalName__List';

// import actions
import * as __camelName__Actions from '../__camelName__Actions'

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class __PascalName__Root extends Binder {
  constructor(props) {
    super(props);
    this._bind(
     '_goBack'
     , '_openCreate__PascalName__'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    this.props.dispatch(__camelName__Actions.fetchList('all'));
    // this.props.dispatch(__camelName__Actions.fetchListIfNeeded('all'));
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _openCreate__PascalName__() {
    this.props.navigation.navigate('Create__PascalName__');
  }

  _sendDelete(id) {
    this.props.dispatch(__camelName__Actions.remove__PascalName__FromList(id));
    this.props.dispatch(__camelName__Actions.sendDelete(id));
  }

  render() {

    const {  __camelName__Store, navigation, userStore } = this.props;

    let __camelName__List = __camelName__Store.util.getList ? __camelName__Store.util.getList('all') : null;

    const rightItem = {
      icon: require('../../../global/img/plus.png'),
      layout: 'icon',
      onPress: this._openCreate__PascalName__
    }

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._goBack,
    }

    return (
      <View style={YTStyles.container}>
        <YTHeader
          title="__startName__"
          // leftItem={leftItem}
          // rightItem={rightItem}
        />
        <View style={{flex: 1}}>
          {__camelName__List && __camelName__List.length > 0 ? 
            <__PascalName__List
              __camelNamePlural__={__camelName__List}
              navigation={navigation}
            />
          : __camelName__List && __camelName__List.length == 0 ?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={YTStyles.text}>Empty</Text>
              </View>
            </View>
          :
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <ActivityIndicator/>
              </View>
            </View>
          }
        </View>

      </View>
    )
  }
}

__PascalName__Root.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    userStoreStore: store.user
    , __camelName__Store: store.__camelName__

  }
}

export default connect(
  mapStoreToProps
)(__PascalName__Root);
