/**
 * List Component for __PascalName__ 
 *
 * Docs for React Native FlatList can be found here:
 * https://facebook.github.io/react-native/docs/flatlist
 * 
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , FlatList
  , Platform
  , RefreshControl
  , ScrollView
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native';

// import actions
import * as __camelName__Actions from '../__camelName__Actions';

// import global components
import Binder from '../../../global/Binder';

// import module components
import __PascalName__ListItem from './__PascalName__ListItem';

// import Styles
import YTStyles from '../../../global/styles/YTStyles';

class __PascalName__List extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this._bind(
      '_handleRefresh'
      , '_open__PascalName__'
      , '_renderSeparator'
    )
  }

  _handleRefresh() {
    this.props.dispatch(__camelName__Actions.fetchList()).then(() => {
    });
  }

  _open__PascalName__(__camelName__) {
    this.props.navigation.navigate('Single__PascalName__', {__camelName__: __camelName__});
  }

  _renderSeparator() {
    return (
      <View style={YTStyles.separator}/>
    )
  }

  render() {
    const { contentInset, __camelNamePlural__ } = this.props;
    const isEmpty = !__camelNamePlural__ || __camelNamePlural__.length < 1;

    return (
      <View style={YTStyles.container}>
        <FlatList
          data={__camelNamePlural__}
          keyExtractor={(__camelName__, index) => index.toString()}
          ItemSeparatorComponent={() => this._renderSeparator()}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          renderItem={(__camelName__) =>
            <__PascalName__ListItem
              __camelName__={__camelName__.item}
              onPress={() => this._open__PascalName__(__camelName__.item)}
            />
          }
        />
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
    , __camelName__Store: store.__camelName__
  }
}

export default connect(mapStoreToProps)(__PascalName__List);
