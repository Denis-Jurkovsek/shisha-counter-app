import React from 'react';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CounterScreen from './src/screens/CounterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MixScreen from './src/screens/MixScreen';
import {Text, View} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import ChatButtonComponent from './src/components/chat-button.component';
const Stack = createNativeStackNavigator();
import theme from './src/theme';

function App() {
  return (
    // Component from ReactNavigation, to make the routing
    <ThemeProvider theme={{theme}}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="Counter"
              component={CounterScreen}
              options={{
                headerShown: true,
                headerTitle: () => <Text />,
                headerStyle: {
                  backgroundColor: '#333',
                },
                headerShadowVisible: false,
                headerRight: () => <ChatButtonComponent />,
              }}
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
    </ThemeProvider>
  );
}

export default React.memo(App);
