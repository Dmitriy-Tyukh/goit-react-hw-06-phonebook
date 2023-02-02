import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';
import initContacts from '../dataJson/contacts.json';

export const createContact = createAction('contacts/add');
export const deleteContact = createAction('contacts/delete');



const initState = {
  contacts: initContacts,
  filter: '',
};

export const contactReduser = createReducer(initState.contacts, {
  [createContact]: (state, action) => [...state, action.payload],
    [deleteContact]: (state, action) => state.filter(contact => contact.id !== action.payload)
});

export const filterReduser = createReducer(initState.filter, {
  filter: (state, action) => state,
});

export const store = configureStore({
  reducer: {
    contacts: contactReduser,
    filter: filterReduser,
  },
});
