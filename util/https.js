import axios from "axios";

function storeExpense(expenseData) {
  axios.post('https://pennywise-7c5f6-default-rtdb.europe-west1.firebasedatabase.app/expenses.json', expenseData)
}
