// Coloque aqui suas actions
const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addUserEmail = (email) => ({
  type: 'ADD_USER_EMAIL',
  email,
});

export const addExpense = (expenses) => ({
  type: 'ADD_EXPENSE',
  expenses,
});

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const addCurrencies = (currencies) => ({
  type: 'ADD_CURRENCIES',
  currencies,
});

export const requestAPI = () => ({
  type: 'RESQUEST_API',
});

export const addExchangeRates = (state, data) => ({
  type: 'ADD_EXCHANGE_RATES',
  ...state,
  data,
});

export const currencyAPI = () => (
  fetch(API_URL).then((response) => response.json())
    .then((data) => data)
);

export function fetchAPI() {
  return async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}
