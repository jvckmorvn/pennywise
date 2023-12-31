import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';

import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true
    }
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => {
        return {
          amount: {value: currInputs.amount.value, isValid: amountIsValid},
          date: {value: currInputs.date.value, isValid: dateIsValid},
          description: {value: currInputs.description.value, isValid: descriptionIsValid}
        };
      })
    } else {
      onSubmit(expenseData);
    }
  }

  const userInputIsValid = inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>My Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            label='Amount'
            invalid={!inputs.amount.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangeHandler.bind(this, 'amount'),
              value: inputs.amount.value
            }}
            style={styles.rowInput}
          />
          <Input
            label='Date'
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, 'date'),
              value: inputs.date.value
            }}
            style={styles.rowInput}
          />
        </View>
        <Input
          label='Description'
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
          }}
        />
      {!userInputIsValid && <Text style={styles.errorText}>Invalid input values, please try again.</Text>}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colours.error500,
    margin: 8
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
