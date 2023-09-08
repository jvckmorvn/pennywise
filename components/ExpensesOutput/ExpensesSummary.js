import { View, Text } from 'react-native';

export default function ExpensesSummary({expenses, periodName}) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);
  
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>£{expensesSum.toFixed(2)}</Text>
    </View>
  );
}
