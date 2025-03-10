import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './src/BookList';
import BookDetail from './src/BookDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" component={BookList} options={{ title: 'Lista de Livros' }} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Detalhes do Livro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;