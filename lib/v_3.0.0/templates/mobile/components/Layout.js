/**
 * Wraps all __PascalName__ views in a wrapping container. If you want to give all
 * __PascalName__ views a sidebar for example, you would set that here.
 * 
 * Accepts a "title" prop and passes it down to be used by React Helmet on the DefaultLayout.
 * This allows us to easily update the browser tab title on each view.
 */

// This is not used very often in mobile 

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

const __PascalName__Layout = ({ ...props }) => {
  return (
    <View title={props.title}>
      {props.children}
    </View>
  )
}

export default __PascalName__Layout
