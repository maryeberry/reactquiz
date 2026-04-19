import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Question from './components/Question';
import Summary from './components/Summary';
import questions from './data';

const Stack = createStackNavigator();

// These options remove the back button and disable the swipe-back gesture
const noBackOptions = {
  headerLeft: () => null,
  gestureEnabled: false,
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Question"
          component={Question}
          options={{ ...noBackOptions, title: 'How well do you know Cinnamoroll?' }}
          initialParams={{ data: questions, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={Summary} options={noBackOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
export { Question, Summary };
