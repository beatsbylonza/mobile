import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "@use-expo/font";
import AppLoading from 'expo-app-loading';

import GetStarted from './Screens/GetStarted';
import Login from './Screens/Login';
import CreateAccount from './Screens/SignUp/CreateAccount';
import MyTabs from './Screens/BottomTabNavigator';
import VerifyEmail from './Screens/SignUp/VerifyEmail';

import PersonalInformation from './Screens/Profile/PersonalInformation';
import ChangePassword2 from './Screens/Profile/ChangePassword2';

import Product from './Screens/Home/Product';

const Stack = createNativeStackNavigator();

const customFonts = {
  RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
      return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
        />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword2}
        />
        <Stack.Screen
          name="Product"
          component={Product}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
