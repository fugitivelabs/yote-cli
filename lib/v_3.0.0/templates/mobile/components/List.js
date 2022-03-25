// List Component for __PascalName__

// import react things
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import react-native things
import {
  ActivityIndicator
  , ScrollView
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

// import module components
import __PascalName__ListItem from './__PascalName__ListItem';

// import services
import { use__PascalName__List } from '../__camelName__Service';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const __PascalName__List = () => {
  const { data: __camelName__s, ids, pagination, ...__camelName__Query } = useGet__PascalName__List({ page: 1, per: 5 });
  const navigation = useNavigation(); 

  return (
    <View style={tw`flex-1`}>
      <YTHeader
        title="__PascalName__s"
        // rightItem={rightItem}
      />
      <ScrollView>
        <View style={tw`p-4`}>
          <YTButton
            caption={"New __PascalName__"}
            onPress={() => navigation.navigate('Create__PascalName__')}
          />
        </View>
        <WaitOn query={__camelName__Query} fallback={<Skeleton count={pagination.per} />}>
          {__camelName__s?.map(__camelName__ => <__PascalName__ListItem key={__camelName__._id} id={__camelName__._id} navigation={navigation}/>)}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ActivityIndicator key={Math.random()}/>)
}

export default __PascalName__List;
