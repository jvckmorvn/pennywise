import { createContext, useReducer } from "react";

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

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      console.log('Reducer');
      const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      console.log('action', action.payload);
      console.log('updateableExpenseIndex:', updateableExpenseIndex);
      const updateableExpense = state[updateableExpenseIndex];
      console.log('updateableExpense:', updateableExpense);
      const updatedExpense = { ...updateableExpense, ...action.payload.expenseData };
      console.log('updatedExpense:', updatedExpense);
      const updatedExpenses = [...state];
      console.log('updatedExpensesbefore:', updatedExpenses);
      updatedExpenses[updateableExpenseIndex] = updatedExpense;
      console.log('updatedExpensesafter:', updatedExpenses);
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id, expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
