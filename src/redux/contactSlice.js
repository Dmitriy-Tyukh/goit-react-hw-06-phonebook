import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { filterReduser } from './filterSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,
  reducers: {
    createContact: (state, { payload }) => {
      state = state.push(payload);
    },
    deleteContact: (state, { payload }) => {
      console.log(payload);
      return (state = state.filter(contact => contact.id !== payload));
    },
  },
});

export const contactReduser = contactSlice.reducer;
export const { createContact, deleteContact } = contactSlice.actions;

const rootReducer = combineReducers({
  contacts: contactReduser,
  filter: filterReduser,
});

const persistConfig = {
  key: 'phoneContact',
  storage,
  whitelist: ['contacts'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
