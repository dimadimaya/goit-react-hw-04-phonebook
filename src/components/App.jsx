import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import shortid from 'shortid';
import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      return alert(`${name} is already in contacts`);
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = contacts.filter(contact => {
    const normalizedFilter = filter.toLowerCase();
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
