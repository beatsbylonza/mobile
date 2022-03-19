import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './Profile';
import PersonalInformation from './PersonalInformation';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Profile'
        modal='true'
      >
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
          mode="modal"
        />
      </Stack.Navigator>
  );
}
