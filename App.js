import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CounterScreen from './src/screens/CounterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MixScreen from './src/screens/MixScreen';
import {View} from 'react-native';
import {StatusBar} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#333');
  });
  return (
    // Component from ReactNavigation, to make the routing
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Counter"
            component={CounterScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Mix"
            component={MixScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Chat"
            component={ChatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default React.memo(App);
