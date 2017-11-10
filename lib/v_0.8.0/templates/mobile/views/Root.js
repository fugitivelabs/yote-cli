/**
 * __PascalName__ component called from TabsView
 * sends __name__List as props to __PascalName__TitleList component for the ListView datasource
 */

// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components & apis
import ActivityIndicator from 'ActivityIndicator';
import StyleSheet from 'StyleSheet';
import ScrollView from 'ScrollView';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

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
import * as __name__Actions from '../__name__Actions'

// import styles
import __name__Styles from '../__name__Styles';

class __PascalName__Root extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     , '_openNew'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    this.props.dispatch(__name__Actions.fetchListIfNeeded());
  }

  _openProfile() {
    this.props.navigator.push({profile: true});
  }

  _openNew() {
    this.props.navigation.navigate('New__PascalName__');
  }

  _sendDelete(id) {
    this.props.dispatch(__name__Actions.sendDelete(id)).then((res) => {
      this.props.dispatch(__name__Actions.remove__PascalName__FromList(id));
    })
  }

  render() {

    const {  __name__Store, navigation, user } = this.props;

    if(!__name__Store.lists.all || __name__Store.lists.all.isFetching) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    let __name__List = __name__Store.lists.all ? __name__Store.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    const rightItem = {
      onPress: () => this._openNew()
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    const leftItem = {
      onPress: () => this._openProfile(),
      image: profileImg,
      layout: "image",
    };

    return (
      <View style={{flex: 1}}>
        <YTHeader
          title="__PascalName__"
          rightItem={rightItem}
        >
        </YTHeader>

        <View style={{flex: 1}}>
          <__PascalName__List
            __name__s={__name__List}
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
    , __name__Store: store.__name__

  }
}

export default connect(
  mapStoreToProps
)(__PascalName__Root);
