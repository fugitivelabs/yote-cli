/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ store
 */

// import react things
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

// import react-native things
import {
  ActivityIndicator
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import module components
import __PascalName__Form from '../components/__PascalName__Form'; 

// import services
import { useCreate__PascalName__ } from '../__camelName__Service';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const Create__PascalName__ = () => {
  const navigation = useNavigation(); 

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating(boolean) is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false)
  const [new__PascalName__, set__PascalName__] = useState({});
  // get the default __camelName__ and the create action
  const { data: default__PascalName__, sendCreate__PascalName__, ...default__PascalName__Query } = useCreate__PascalName__();

  useEffect(() => {
    // once we have the default __camelName__, set it to state
    if(default__PascalName__) {
      set__PascalName__(default__PascalName__);
    }
  }, [default__PascalName__])

  // set__PascalName__ will replace the entire __camelName__ object with the new __camelName__ object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    // both ways below accomplish the same thing.
    set__PascalName__({ ...new__PascalName__, [e.target.name]: e.target.value });
    // if we didn't have direct access to `new__PascalName__` we could use this where we can access __camelName__ as the current state
    // set__PascalName__(current__PascalName__State => {
    //   return { ...current__PascalName__State, [e.target.name]: e.target.value }
    // });

  }

  const handleFormSubmit = async () => {
    // set isCreating true to disable the form while wait for the new __camelName__ to get returned
    setIsCreating(true)
    const { payload: __camelName__ } = await sendCreate__PascalName__(new__PascalName__) // replaces dispatch(__camelName__Actions.sendCreate__PascalName__(new__PascalName__)).then(__camelName__Res => ...)
    setIsCreating(false)
    navigation.replace('Single__PascalName__', {__camelName__Id: __camelName__._id}); 
  }

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  // render UI based on data and loading state
  return (
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title='Create __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={default__PascalName__Query}>
        <__PascalName__Form
          __camelName__={new__PascalName__}
          disabled={default__PascalName__Query.isFetching || isCreating}
          formType="create"
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </View>
  )
}

export default Create__PascalName__
