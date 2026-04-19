import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed';

function Question({ route, navigation }) {
  // Pull the questions array, current question index, and collected answers from navigation params
  const { data, index, answers } = route.params;

  // Get just the current question object
  const currentQuestion = data[index];

  // For true-false and multiple-choice: track a single selected index (null = nothing selected yet)
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // For multiple-answer: track an array of selected indices (empty = nothing selected yet)
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Called when the user taps a choice in single-select mode
  function handleSingleSelect(choiceIndex) {
    setSelectedAnswer(choiceIndex);
  }

  // Called when the user taps a choice in multiple-answer mode
  // When selectMultiple is true, @rneui passes back the full updated array of selected indices
  function handleMultiSelect(selectedIndexes) {
    setSelectedAnswers(selectedIndexes);
  }

  // Called when the user presses the Next / See Results button
  function handleNext() {
    // Add the current answer to the answers array
    let newAnswers;
    if (currentQuestion.type === 'multiple-answer') {
      newAnswers = [...answers, selectedAnswers];
    } else {
      newAnswers = [...answers, selectedAnswer];
    }

    // If this is the last question, go to the Summary screen
    if (index + 1 >= data.length) {
      navigation.navigate('Summary', { data: data, answers: newAnswers });
    } else {
      // Otherwise push the next question onto the stack
      navigation.push('Question', { data: data, index: index + 1, answers: newAnswers });
    }
  }

  // Disable the Next button until the user has made a selection
  let isDisabled;
  if (currentQuestion.type === 'multiple-answer') {
    isDisabled = selectedAnswers.length === 0;
  } else {
    isDisabled = selectedAnswer === null;
  }

  // Show "See Results" on the last question, "Next Question" on all others
  const buttonLabel = index + 1 >= data.length ? 'See Results' : 'Next Question';

  return (
    <View style={styles.container}>

      {/* Question counter e.g. "Question 2 of 5" */}
      <Text style={styles.counter}>Question {index + 1} of {data.length}</Text>

      {/* The question text */}
      <Text style={styles.prompt}>{currentQuestion.prompt}</Text>

      {/* The answer choices rendered as a vertical ButtonGroup */}
      <ButtonGroup
        testID="choices"
        buttons={currentQuestion.choices}
        vertical
        selectedIndex={currentQuestion.type !== 'multiple-answer' ? selectedAnswer : undefined}
        selectedIndexes={currentQuestion.type === 'multiple-answer' ? selectedAnswers : undefined}
        selectMultiple={currentQuestion.type === 'multiple-answer'}
        onPress={currentQuestion.type === 'multiple-answer' ? handleMultiSelect : handleSingleSelect}
        containerStyle={styles.buttonGroup}
      />

      {/* Next / See Results button */}
      <Button
        testID="next-question"
        title={buttonLabel}
        onPress={handleNext}
        disabled={isDisabled}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  counter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonGroup: {
    marginBottom: 30,
  },
});

export default Question;
