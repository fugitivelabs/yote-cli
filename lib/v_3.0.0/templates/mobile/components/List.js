// List Component for __PascalName__

// import react things
import React from 'react';

// import react-native components
import {
  ScrollView
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import global  components
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

// import resource components
import __PascalName__ListItem from './__PascalName__ListItem';

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc'; 

// import services
import { useGet__PascalName__List } from '../__camelName__Service';

const __PascalName__List = () => {
  const { data: __camelName__s, ids, ...__camelName__Query } = useGet__PascalName__List({});
  const navigation = useNavigation(); 

  return (
    <View style={{flex: 1}}>
      <YTHeader
        title="__PascalName__s"
        // rightItem={rightItem}
      />
      <ScrollView style={tw`p-2`}>
        <View style={tw`p-2`}>
          <YTButton
            caption={"New __PascalName__"}
            onPress={() => navigation.navigate('Create__PascalName__')}
          />
        </View>
        <WaitOn query={__camelName__Query} fallback={<Skeleton />}>
          {__camelName__s?.map(__camelName__ => <__PascalName__ListItem key={__camelName__._id} id={__camelName__._id} onPress={() => navigation.navigate('Single__PascalName__', { __camelName__Id: id })}/>)}
          {/* {ids?.map(__camelName__Id => <__PascalName__ListItem key={__camelName__Id} id={__camelName__Id} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('__kebabName__-list-item-skeleton');
  return items.map((name, index) => <__PascalName__ListItem.Skeleton key={`${name} ${index}`} />)
}

export default __PascalName__List;
