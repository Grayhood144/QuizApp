import React, { useState } from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ButtonGroup } from 'react-native-elements';

const Stack = createNativeStackNavigator();

const questions = [
  {
    prompt: "Which is the largest planet in our solar system?",
    type: "multiple-choice",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    correct: 1,
  },
  {
    prompt: "Select all prime numbers.",
    type: "multiple-answer",
    choices: ["2", "4", "5", "6"],
    correct: [0, 2],
  },
  {
    prompt: "The sky is blue.",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1,
  },
];

function QuestionScreen({ navigation, route }) {
  const { data, index, answers } = route.params;
  const question = data[index];
  const isMultiAnswer = question.type === "multiple-answer";

  const [selected, setSelected] = useState(
    isMultiAnswer ? [] : -1
  );

  const handleSelect = (i) => {
    if (isMultiAnswer) {
      setSelected((prev) => {
        // Ensure prev is always an array
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.includes(i)
          ? safePrev.filter((x) => x !== i)
          : [...safePrev, i];
      });
    } else {
      setSelected(i);
    }
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = isMultiAnswer
      ? Array.isArray(selected)
        ? [...selected]
        : []
      : typeof selected === "number"
      ? selected
      : -1;

    navigation.navigate(
      index + 1 < data.length ? 'Question' : 'Summary',
      index + 1 < data.length
        ? {
            data,
            index: index + 1,
            answers: updatedAnswers,
          }
        : {
            data,
            answers: updatedAnswers,
          }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <ButtonGroup
        vertical
        buttons={question.choices}
        onPress={handleSelect}
        selectedIndexes={
          isMultiAnswer && Array.isArray(selected)
            ? selected
            : isMultiAnswer
            ? []
            : undefined
        }
        selectedIndex={
          !isMultiAnswer && typeof selected === "number"
            ? selected
            : !isMultiAnswer
            ? -1
            : undefined
        }
        containerStyle={{ marginBottom: 20 }}
        testID="choices"
      />
      <Button
        title="Next"
        onPress={handleNext}
        testID="next-question"
        disabled={
          (isMultiAnswer && selected.length === 0) ||
          (!isMultiAnswer && selected === -1)
        }
      />
    </View>
  );
}

function SummaryScreen({ route }) {
  const { data, answers } = route.params;

  const score = data.reduce((total, question, i) => {
    const userAnswer = answers[i];
    if (question.type === "multiple-answer") {
      const correct = question.correct.sort().toString();
      const user = (userAnswer || []).sort().toString();
      return correct === user ? total + 1 : total;
    } else {
      return userAnswer === question.correct ? total + 1 : total;
    }
  }, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.score} testID="total">
        Score: {score} / {data.length}
      </Text>
      {data.map((q, i) => (
        <View key={i} style={{ marginBottom: 15 }}>
          <Text style={styles.prompt}>{q.prompt}</Text>
          {q.choices.map((choice, j) => {
            const userAnswer = answers[i];
            const isCorrect = Array.isArray(q.correct)
              ? q.correct.includes(j)
              : q.correct === j;

            const wasChosen = Array.isArray(userAnswer)
              ? userAnswer.includes(j)
              : userAnswer === j;

            let style = {};
            if (wasChosen && isCorrect) {
              style = { fontWeight: 'bold', color: 'green' };
            } else if (wasChosen && !isCorrect) {
              style = {
                fontWeight: 'bold',
                textDecorationLine: 'line-through',
                color: 'red',
              };
            } else if (!wasChosen && isCorrect) {
              style = { fontWeight: 'bold', color: 'green' };
            } else if (wasChosen) {
              style = { color: '#ccc' };
            }

            return (
              <Text key={j} style={style}>
                {choice}
              </Text>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          initialParams={{ data: questions, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  prompt: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  score: {
    fontSize: 22,
    color: '#00ff88',
    marginBottom: 15,
  },
});
