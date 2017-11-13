/**
 * sets up datasource and necessary functions for the ListView call
 * _renderRow is where each __name__Id of the datasource is sent to __PascalName__TitleCard
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import RefreshControl from 'RefreshControl';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableHighlight from 'TouchableHighlight';
import View from 'View';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from '../../../global/components/BaseComponent';

// import module components
import __PascalName__ListItem from './__PascalName__ListItem';

// import Styles
import __name__Styles from '../__name__Styles';
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
      dataSource: cloneWithData(dataSource, props.__name__s),
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
    let listViewScrollView = this.refs.templateList.getScrollResponder();
    listViewScrollView.scrollTo({y:1});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.__name__s !== nextProps.__name__s || this.props.__name__Map !== nextProps.__name__Map) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.__name__s)
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
    //     <Text style={__name__Styles.header}> ListView Header! </Text>
    //   </View>)
  }

  _renderFooter() {
    // console.log("render Footer");
  }

  _renderSeparator(sectionID, rowID) {
    // return (
    //   <View style={styles.separator} key={rowID} />
    // )
  }

  _renderRow(__name__Id) {
    const { __name__Map } = this.props;
    return (
      <__PascalName__ListItem
        __name__={__name__Map[__name__Id]}
        onPress={() => this._open__PascalName__(__name__Id)}
      />
    )
  }

  _handleRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(__name__Actions.fetchList()).then(() => {
      // console.log("REFRESHED", this.state.refreshing);
      this.setState({refreshing: false});

    });
  }

  _open__PascalName__(__name__Id) {
    console.log("open __name__", __name__Id);
    // this.props.dispatch(my__PascalName__SingleActions.setCurrent(__name__._id));
    this.props.navigation.navigate('Single__PascalName__', {__name__Id: __name__Id});
  }

  render() {
    const { contentInset, __name__s } = this.props;
    const isEmpty = !__name__s || __name__s.length < 1;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    let listFlex = isEmpty ? { flex: 1 } : { flex: 1 }; // ??? the same

    const refreshControl =
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._handleRefresh}
     />

   return (
     <View style={__name__Styles.container}>

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
  __name__s: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number
}

__PascalName__List.defaultProps = {
  __name__s: [],
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
    , __name__Map: store.__name__.byId
  }
}

export default connect(mapStoreToProps)(__PascalName__List);
