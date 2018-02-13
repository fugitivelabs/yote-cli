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
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import EmptyMessage from '../../../global/components/EmptyMessage';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTColors from '../../../global/styles/YTColors';
import YTHeader from '../../../global/components/YTHeader';

// import module components
import __PascalName__List from '../components/__PascalName__List';

// import actions
import * as __camelName__Actions from '../__camelName__Actions'

// import styles
import __camelName__Styles from '../__camelName__Styles';

class __PascalName__Root extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_closeModal'
     , '_openNew'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    this.props.dispatch(__camelName__Actions.fetchListIfNeeded());
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openNew() {
    this.props.navigation.navigate('Create__PascalName__');
  }

  _sendDelete(id) {
    this.props.dispatch(__camelName__Actions.sendDelete(id)).then((res) => {
      this.props.dispatch(__camelName__Actions.remove__PascalName__FromList(id));
    })
  }

  render() {

    const {  __camelName__Store, navigation, user } = this.props;

    if(!__camelName__Store.lists.all || __camelName__Store.lists.all.isFetching) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    let __camelName__List = __camelName__Store.lists.all ? __camelName__Store.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    const rightItem = {
      onPress: () => this._openNew()
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    return (
      <View style={{flex: 1}}>
        <YTHeader
          leftItem={leftItem}
          title="__startName__"
        >
        </YTHeader>

        <View style={{flex: 1}}>
          <__PascalName__List
            __camelNamePlural__={__camelName__List}
            navigation={navigation}
          />
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
    user: store.user
    , __camelName__Store: store.__camelName__

  }
}

export default connect(
  mapStoreToProps
)(__PascalName__Root);
