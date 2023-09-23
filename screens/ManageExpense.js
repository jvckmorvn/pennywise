import { useLayoutEffect } from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/https';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function ManageExpenses({route, navigation}) {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  );
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSending(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      closeModal();
    } catch (error) {
      setError('Could not delete expense.');
      setIsSending(false);
    }
  }
  
  function cancelHandler() {
    closeModal();
  }
  
  async function confirmHandler(expenseData) {
    setIsSending(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      closeModal();
    } catch (error) {
      setError('Could not save data');
      setIsSending(false);
    }
  }

  function closeModal() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSending) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

  if (isSending) {
    return <LoadingOverlay/>;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      <View style={styles.deleteContainer}>
        {isEditing && <IconButton icon='trash' colour={GlobalStyles.colours.error500} size={36} onPress={deleteExpenseHandler}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colours.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colours.primary200,
    alignItems: 'center'
  },
});
