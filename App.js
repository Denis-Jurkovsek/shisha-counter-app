import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CounterScreen from './src/screens/CounterScreen';
import LoginScreen from './src/screens/LoginScreen';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // Component from ReactNavigation, to make the routing
    <SafeAreaView style={{flex: 1}}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default React.memo(App);
