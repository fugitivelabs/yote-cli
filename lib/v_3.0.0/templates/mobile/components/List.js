// List Component for __PascalName__

// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  ActivityIndicator
  , Image
  , Platform
  , RefreshControl
  , ScrollView
  , Text
  , TouchableHighlight
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import actions/reducers
import { use__PascalName__List } from '../__camelName__Service';

// import components
import __PascalName__ListItem from './__PascalName__ListItem';
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

// import styles
import YTStyles from '../../../global/styles/YTStyles';

// import services
import { useGet__PascalName__List } from '../__camelName__Service';

const __PascalName__List = () => {
  const { data: __camelName__s, ids, pagination, ...__camelName__Query } = useGet__PascalName__List({ page: 1, per: 5 });
  const navigation = useNavigation(); 

  return (
    <View style={{flex: 1}}>
      <YTHeader
        title="__PascalName__s"
        // rightItem={rightItem}
      />
      <ScrollView>
        <View style={{padding: 10}}>
          <YTButton
            caption={"New __PascalName__"}
            onPress={() => navigation.navigate('Create__PascalName__')}
          />
        </View>
        <WaitOn query={__camelName__Query} fallback={<Skeleton count={pagination.per} />}>
          {__camelName__s?.map(__camelName__ => <__PascalName__ListItem key={__camelName__._id} id={__camelName__._id} navigation={navigation}/>)}
          {/* {ids?.map(__camelName__Id => <__PascalName__ListItem key={__camelName__Id} id={__camelName__Id} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ActivityIndicator/>)
}

export default __PascalName__List;
