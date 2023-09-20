import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

import Button from "../UI/Button";
import { getFormattedDate } from '../../util/date';

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description.toString() : ''
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue
      }
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };

    onSubmit(expenseData);
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
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
