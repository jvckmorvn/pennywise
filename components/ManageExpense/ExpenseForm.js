import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

export default function ExpenseForm() {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue
      }
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>My Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1
  }
});
