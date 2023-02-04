import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from 'components/ContactsList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { createContact, deleteContact } from '../../redux/contactSlice';
import { searchContact } from 'redux/filterSlice';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleFiltContacts = event => {
    dispatch(searchContact(event.currentTarget.value));
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  const handleDeleteContact = dataId => {
    dispatch(deleteContact(dataId));
  };

  const handleAddContact = ({ name, number }) => {
    const nameContact = name;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (contacts.some(({ name }) => name === nameContact)) {
      alert(`${nameContact} is already in contacts.`);
      return;
    }
    dispatch(createContact(newContact));
  };

  return (
    <div>
      <h1>Phonebook </h1>
      <ContactForm onSubmitForm={handleAddContact} />

      <h2>Contacts</h2>
      <Filter fiter={filter} onFiltContacts={handleFiltContacts} />
      <ContactsList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
