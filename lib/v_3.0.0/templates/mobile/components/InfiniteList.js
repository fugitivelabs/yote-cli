/**
 * Infinite scrolling list of __camelName__s, uses RecyclerListView to render massive lists with less lag. 
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from '../../../global/styles/tailwind/twrnc';

// import react-native components
import {
  Dimensions
  , Text
  , View
} from 'react-native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import YTButton from '../../../global/buttons/YTButton';
import InfiniteList from '../../../global/components/helpers/InfiniteList';

// import resource components
import __PascalName__ListItem from './__PascalName__ListItem';

// import services
import { useInfinite__PascalName__List } from '../__camelName__Service';

const Infinite__PascalName__List = (props) => {
  const navigation = useNavigation();
  const width = props.width || Dimensions.get('window').width;

  // use the hook to get the __camelName__ list, convenience methods for the recycler list, and fetching state
  const infinite__PascalName__List = useInfinite__PascalName__List({});

  // We have to tell the InfiniteList component how to render each item
  const rowRenderer = (type, id) => {
    // RecyclerListView allows for using `type` here to render different list items based on the data. Not currently used so only works with one type (__PascalName__ListItem in this case).
    return (
      <__PascalName__ListItem
        key={id}
        id={id}
        onPress={() => navigation.navigate('Single__PascalName__', { __camelName__Id: id })}
      />
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title="__PascalName__s"
      // rightItem={rightItem}
      />
      <View style={tw`p-2`}>
        <View style={tw`p-2`}>
          <YTButton
            caption={"New __PascalName__"}
            onPress={() => navigation.navigate('Create__PascalName__')}
          />
        </View>
        <View style={tw`mb-80`}>
          <InfiniteList
            {...infinite__PascalName__List} //  the hook provides everything needed aside from the component level stuff below
            itemHeight={__PascalName__ListItem.fixedHeight}
            itemWidth={width}
            rowRenderer={rowRenderer}
            skeleton={<Skeleton />}
            emptyList={<EmptyList />}
          />
        </View>
      </View>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('__kebabName__-list-item-skeleton');
  return items.map((name, index) => <__PascalName__ListItem.Skeleton key={`${name} ${index}`} />)
}

const EmptyList = () => {
  return (
    <View style={tw`justify-center items-center py-4`}>
      <Text>No __camelName__s found</Text>
    </View>
  )
}

export default Infinite__PascalName__List;
