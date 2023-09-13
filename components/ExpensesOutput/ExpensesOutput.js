import { View, StyleSheet } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: '1',
    description: 'New shoes',
    amount: 69.99,
    date: new Date('2023-09-08')
  },
  {
    id: '2',
    description: 'Airpods',
    amount: 129.99,
    date: new Date('2023-07-02')
  },
  {
    id: '3',
    description: 'Flights to Lisbon',
    amount: 259.99,
    date: new Date('2023-04-14')
  },
  {
    id: '4',
    description: 'Book',
    amount: 9.99,
    date: new Date('2023-05-23')
  },
  {
    id: '5',
    description: 'Smoothie',
    amount: 7.99,
    date: new Date('2023-05-26')
  }
];

export default function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colours.primary200,
    flex: 1
  }
});