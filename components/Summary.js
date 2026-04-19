import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

// Get the height of the screen so we can give the ScrollView a fixed height
const screenHeight = Dimensions.get('window').height;

function Summary({ route }) {
  // Get the questions and the user's answers from navigation params
  const { data, answers } = route.params;

  // Calculate the total score
  let score = 0;

  for (let i = 0; i < data.length; i++) {
    const question = data[i];
    const userAnswer = answers[i];

    if (question.type === 'multiple-answer') {
      // Sort both arrays and compare as strings to check for an exact match
      const sortedCorrect = [...question.correct].sort().join(',');
      const sortedUser = [...userAnswer].sort().join(',');
      if (sortedCorrect === sortedUser) {
        score = score + 1;
      }
    } else {
      // For single-answer questions, just compare the two numbers
      if (userAnswer === question.correct) {
        score = score + 1;
      }
    }
  }

  return (
    <View style={styles.wrapper}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Cinnamoroll image */}
      <Image source={require('../cinnaimg.png')} style={styles.image} />

      {/* Total score display */}
      <Text testID="total" style={styles.total}>
        Score: {score} / {data.length}
      </Text>

      {/* Loop through every question and show the result */}
      {data.map(function (question, i) {

        // Check if the user got this question fully correct
        let questionCorrect;
        if (question.type === 'multiple-answer') {
          const sortedCorrect = [...question.correct].sort().join(',');
          const sortedUser = [...answers[i]].sort().join(',');
          questionCorrect = sortedCorrect === sortedUser;
        } else {
          questionCorrect = answers[i] === question.correct;
        }

        return (
          <View key={i} style={styles.questionBlock}>

            {/* Question prompt with a checkmark or cross */}
            <Text style={styles.prompt}>
              {questionCorrect ? '✓ ' : '✗ '}{question.prompt}
            </Text>

            {/* Loop through each choice and style it */}
            {question.choices.map(function (choice, j) {

              // Was this choice selected by the user?
              let wasChosen;
              if (question.type === 'multiple-answer') {
                wasChosen = answers[i].includes(j);
              } else {
                wasChosen = answers[i] === j;
              }

              // Is this choice one of the correct answers?
              let isCorrect;
              if (question.type === 'multiple-answer') {
                isCorrect = question.correct.includes(j);
              } else {
                isCorrect = question.correct === j;
              }

              // Pick the right style:
              // chosen + correct  → bold
              // chosen + wrong    → strikethrough
              // not chosen        → normal
              let choiceStyle = styles.choiceNormal;
              if (wasChosen && isCorrect) {
                choiceStyle = styles.choiceCorrect;
              } else if (wasChosen && !isCorrect) {
                choiceStyle = styles.choiceWrong;
              }

              return (
                <Text key={j} style={choiceStyle}>
                  • {choice}
                </Text>
              );
            })}

          </View>
        );
      })}

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: screenHeight,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  image: {
    marginBottom: 16,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  questionBlock: {
    width: '100%',
    marginBottom: 24,
  },
  prompt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  choiceNormal: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  choiceCorrect: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  choiceWrong: {
    fontSize: 15,
    textDecorationLine: 'line-through',
    color: '#999',
    marginBottom: 4,
  },
});

export default Summary;
