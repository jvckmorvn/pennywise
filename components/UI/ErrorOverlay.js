import { Text, View, StyleSheet } from 'react-native';

import Button from './Button';
import { GlobalStyles } from '../../constants/styles';

export default function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Something went wrong...</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colours.primary700
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
