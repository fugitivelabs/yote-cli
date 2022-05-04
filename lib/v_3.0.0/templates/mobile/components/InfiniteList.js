/**
 * Infinite scrolling list of __camelName__s
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from '../../../global/styles/tailwind/twrnc';

// import react-native components
import {
  FlatList
  , Text
  , View
} from 'react-native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import resource components
import __PascalName__ListItem from './__PascalName__ListItem';

// import services
import { useInfinite__PascalName__List } from '../__camelName__Service';

const Infinite__PascalName__List = () => {
  const navigation = useNavigation();

  // use the hook to get the __camelName__ list, convenience methods for the FlatList, and fetching state
  const { data: __camelName__s, refresh, getNextPage, isFetching } = useInfinite__PascalName__List({});

  // defining renderItem here because we need to pass in the navigation prop
  const renderItem = ({ item: __camelName__ }) => {
    return (
      <__PascalName__ListItem
        key={__camelName__?._id}
        id={__camelName__?._id}
        navigation={navigation}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
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
        <View style={tw.style(isFetching && 'opacity-50', 'pb-52')}>
          <FlatList
            data={__camelName__s}
            onRefresh={refresh}
            onEndReached={getNextPage}
            onEndReachedThreshold={0.8}
            refreshing={!__camelName__s.length && isFetching}
            ListEmptyComponent={isFetching ? Skeleton : EmptyList}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('list-item-skeleton');
  return items.map((name, index) => <__PascalName__ListItem.Skeleton key={`${name} ${index}`} />)
}

const EmptyList = () => {
  return (
    <View style={tw`flex-1 flex flex-col justify-center items-center`}>
      <Text>No __camelName__s found</Text>
    </View>
  )
}

export default Infinite__PascalName__List;
