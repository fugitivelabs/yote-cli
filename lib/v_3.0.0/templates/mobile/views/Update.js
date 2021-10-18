/**
 * Will update the name and description of an already existing __camelName__
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import {
  Image
  , KeyboardAvoidingView
  , ScrollView
  , Text
  , TextInput
  , View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

import __PascalName__Form from '../components/__PascalName__Form'; 

// import libraries
import _ from 'lodash';

// import services
import { useGetUpdatable__PascalName__ } from '../__camelName__Service';

// import styles
import YTStyles from '../../../global/styles/YTStyles';
import { tailwind, getColor } from '../../../global/styles/tailwind/tailwind.js'; 

const Update__PascalName__ = () => {
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation(); 

  // get the __camelName__ id from the route. Below is equivalent to const { __camelName__Id } = this.props.navigation.state.params;
  // this component knows about __camelName__Id from declaring it in navigation stack in TabNavigator.js 
  const { __camelName__Id } = route.params; 

  // fetches and returns the __camelName__ and the update action wrapped in dispatch.
  // another benefit of using this version is that __camelName__Query.isFetching will be true while the update is being processed by the server.
  const { sendUpdate__PascalName__, data: __camelName__, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id);

  const handleFormSubmit = updated__PascalName__ => {
    // send the updated__PascalName__ to the server
    sendUpdate__PascalName__(updated__PascalName__);
    // back to single __camelName__ view. We don't have to wait for the update to finish. It's okay if the __camelName__ is still updating when the user gets to the single __camelName__ view.
    navigation.goBack(); 
  }

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  return (
    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <View style={YTStyles.container}>
      <YTHeader
        title='Update __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={__camelName__Query}>
        { __camelName__ &&
          // we have the __camelName__, render the form
          <__PascalName__Form
            __camelName__={__camelName__}
            cancelLink={`/__camelName__s/${__camelName__Id}`}
            disabled={__camelName__Query.isFetching}
            formType="update"
            handleFormSubmit={handleFormSubmit}
          />
        }
      </WaitOn>
    </View>
  )
}

export default Update__PascalName__;
