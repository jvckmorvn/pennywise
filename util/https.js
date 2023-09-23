import axios from 'axios';

const FIREBASE_URL = 'https://pennywise-7c5f6-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData) {
  const response = await axios.post(`${FIREBASE_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${FIREBASE_URL}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${FIREBASE_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
}
