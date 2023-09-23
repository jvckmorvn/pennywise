import { useLayoutEffect } from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/https';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function ManageExpenses({route, navigation}) {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  );
  const [isSending, setIsSending] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    setIsSending(true);
    await deleteExpense(editedExpenseId);
    closeModal();
  }
  
  function cancelHandler() {
    closeModal();
  }
  
  async function confirmHandler(expenseData) {
    setIsSending(true);
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({...expenseData, id: id});
    }
    closeModal();
  }

  function closeModal() {
    navigation.goBack();
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
