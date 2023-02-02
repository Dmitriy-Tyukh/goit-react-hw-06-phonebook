import React, { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './App.styled'
// import defaultContacts from 'dataJson/contacts.json';
import ContactsList from 'components/ContactsList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { createContact, deleteContact } from 'redux/store'; 

const App = () => {

    // const [contacts, setContacts] = useState(()=>{return JSON.parse(localStorage.getItem('contacts')) || defaultContacts});
    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('')

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]) 

    const handleFiltContacts = event => {
        setFilter(event.currentTarget.value);
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

        // setContacts(prevContacts => [...prevContacts, newContact])
            dispatch(createContact(newContact));
    };
  
    return (
      <Box>
        <h1>Phonebook </h1>
        <ContactForm onSubmitForm={handleAddContact} />

        <h2>Contacts</h2>
        <Filter fiter={filter} onFiltContacts={handleFiltContacts} />
        <ContactsList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
      </Box>
    )
  }

export default App;
