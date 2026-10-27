// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// const initialState = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };
const initialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        // Next id after the highest one, so ids stay unique after deletions.
        { id: state.expenses.reduce((max, { id }) => Math.max(max, id + 1), 0), ...action.expenses },
      ],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
}

export default walletReducer;
