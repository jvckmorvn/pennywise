import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Input({label, invalid, textInputConfig, style}) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidLabel);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig}/>
    </View>
  );  
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colours.primary100,
    marginBottom: 4
  },
  invalidLabel: {
    color: GlobalStyles.colours.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colours.error50
  },
  input: {
    backgroundColor: GlobalStyles.colours.primary100,
    color: GlobalStyles.colours.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
});
