import React from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="Login"
               component={Login}
               options={{title: 'Главная'}}
            />
            <Stack.Screen
               name="Chat"
               component={Chat}
               options={{title: 'Чат'}}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}