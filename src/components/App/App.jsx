import { Box } from 'components/Box';
import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(initialContacts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  function initialContacts() {
    return localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY))
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  }

  function addContact(name, number) {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    preventRecurringEvent(name)
      ? warnMessage(name)
      : setContacts(prev => [...prev, contact]);
  }

  function preventRecurringEvent(name) {
    return contacts.some(e => e.name === name);
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function deleteContacts(contactId) {
    setContacts(() => contacts.filter(({ id }) => id !== contactId));
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
    );
  }

  function warnMessage(name) {
    alert(`${name} is already in the contact book`);
  }

  return (
    <Box bg="primary" p={5}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContacts={deleteContacts}
      />
    </Box>
  );
};
