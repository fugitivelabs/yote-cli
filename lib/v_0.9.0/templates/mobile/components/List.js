/**
 * sets up datasource and necessary functions for the ListView call
 * _renderRow is where each __camelName__Id of the datasource is sent to __PascalName__TitleCard
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
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
import Base from '../../../global/components/BaseComponent';

// import module components
import __PascalName__ListItem from './__PascalName__ListItem';

// import Styles
import __camelName__Styles from '../__camelName__Styles';
import YTColors from '../../../global/styles/YTColors';

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;


class __PascalName__List extends Base {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.__camelNamePlural__),
      refreshing: false
    }
    this._bind(
      '_renderFooter'
      , '_onContentSizeChange'
      , '_renderRow'
      , '_renderSeparator'
      , '_handleRefresh'
      , '_open__PascalName__'
      , '_renderHeader'
    )
  }

  componentDidMount() {
    // let listViewScrollView = this.refs.templateList.getScrollResponder();
    // listViewScrollView.scrollTo({y:1});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.__camelNamePlural__ !== nextProps.__camelNamePlural__ || this.props.__camelName__Store !== nextProps.__camelName__Store) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.__camelNamePlural__)
      });
    }
  }

  _onContentSizeChange(contentWidth: number, contentHeight: number) {
    if(contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  _renderHeader() {
    // return (
    //   <View>
    //     <Text style={__camelName__Styles.header}> ListView Header! </Text>
    //   </View>)
  }

  _renderFooter() {
    // console.log("render Footer");
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View style={__camelName__Styles.listSeparator} key={rowID} />
    )
  }

  _renderRow(__camelName__Id) {
    const { __camelName__Store } = this.props;
    return (
      <__PascalName__ListItem
        __camelName__={__camelName__Store.byId[__camelName__Id]}
        onPress={() => this._open__PascalName__(__camelName__Id)}
      />
    )
  }

  _handleRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(__camelName__Actions.fetchList()).then(() => {
      // console.log("REFRESHED", this.state.refreshing);
      this.setState({refreshing: false});

    });
  }

  _open__PascalName__(__camelName__Id) {
    console.log("open __camelName__", __camelName__Id);
    // this.props.dispatch(my__PascalName__SingleActions.setCurrent(__camelName__._id));
    this.props.navigation.navigate('Single__PascalName__', {__camelName__Id: __camelName__Id});
  }

  render() {
    const { contentInset, __camelNamePlural__ } = this.props;
    const isEmpty = !__camelNamePlural__ || __camelNamePlural__.length < 1;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    let listFlex = isEmpty ? { flex: 1 } : { flex: 1 }; // ??? the same

    const refreshControl =
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._handleRefresh}
     />

   return (
     <View style={__camelName__Styles.container}>

       <ListView
         ref="templateList"
         initialListSize={10}
         pageSize={LIST_VIEW_PAGE_SIZE}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow}
         renderHeader={this._renderHeader}
         renderFooter={this._renderFooter}
         renderSeparator={this._renderSeparator}
         enableEmptySections={true}
         onContentSizeChange={this._onContentSizeChange}
         scrollRenderAheadDistance={600}
         refreshControl={ refreshControl }
         removeClippedSubviews={false}
       />

     </View>
   )
  }


}

__PascalName__List.propTypes = {
  __camelNamePlural__: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number
}

__PascalName__List.defaultProps = {
  __camelNamePlural__: [],
  contentInset: { top: 0, bottom: 0 },
  // TODO: This has to be scrollview height + fake header
  minContentHeight: Dimensions.get('window').height + 20,
  renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
}


function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    // console.log("RENDER AS ARRAY");
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
    , __camelName__Store: store.__camelName__
  }
}

export default connect(mapStoreToProps)(__PascalName__List);
