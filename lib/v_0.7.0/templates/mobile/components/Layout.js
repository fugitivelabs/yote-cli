/**
* __PascalName__ component called from TabsView
* sends __name__List as props to __PascalName__TitleList component for the ListView datasource
*/

// import react/redux dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components & apis
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
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTColors from '../../../global/styles/YTColors';
import YTHeader from '../../../global/components/YTHeader';

// import module components
import __PascalName__List from './__PascalName__List';

// import actions
import * as __name__Actions from '../__name__Actions'

// import styles
import __name__Styles from '../__name__Styles';

class __PascalName__ extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     , '_openNew'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    // this.props.dispatch(__name__Actions.fetchListIfNeeded());
  }

  _openProfile() {
    this.props.navigator.push({profile: true});
  }

  _openNew() {
    this.props.navigator.push({new__PascalName__: true});
  }

  _sendDelete(id) {
    this.props.dispatch(__name__Actions.sendDelete(id)).then((res) => {
      this.props.dispatch(__name__Actions.remove__PascalName__FromList(id));
    })
  }

  render() {

    const {  __name__s, navigator, user } = this.props;

    if(!__name__s.lists.all || __name__s.lists.all.isFetching) {
      return (
        <EmptyMessage
          message="Loading __PascalName__s..."
        />
      )
    }
    let __name__List = __name__s.lists.all ? __name__s.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/wile.png');

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
          title="Yote"
          leftItem={leftItem}
          rightItem={rightItem}
        >
        </YTHeader>

        <View style={{flex: 1}}>
          <__PascalName__List
            __name__s={__name__List}
            navigator={navigator}
          />
        </View>

      </View>
    )
  }
}

__PascalName__.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    user: store.user
    , __name__s: store.__name__

  }
}

export default connect(
  mapStoreToProps
)(__PascalName__);
