import { createContext, useReducer } from 'react';
import { sortByDate } from '../util/date';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const withAddedExpense = [{...action.payload}, ...state];
      return sortByDate(withAddedExpense);
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updateableExpense = state[updateableExpenseIndex];
      const updatedExpense = { ...updateableExpense, ...action.payload.expenseData };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedExpense;
      return sortByDate(updatedExpenses);
    case 'DELETE':
      const withoutDeletedExpense = state.filter((expense) => expense.id !== action.payload);
      return sortByDate(withoutDeletedExpense);
    case 'SET':
      return sortByDate(action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id, expenseData}});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
