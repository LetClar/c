import React, { useState } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addOrUpdateContact = (contact) => {
    if (contact.id) {
      setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
    } else {
      contact.id = Date.now();
      setContacts([...contacts, contact]);
    }
    setSelectedContact(null);
    setShowForm(false);
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
    setShowForm(true);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedContact(null);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Contact Management System</h1>
      </div>
      <button className="contacts-button" onClick={toggleForm}>
        {showForm ? 'Close Form' : 'Add Contact'}
      </button>
      {showForm && (
        <ContactForm
          onSave={addOrUpdateContact}
          selectedContact={selectedContact}
        />
      )}
      <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
    </div>
  );
};

export default App;
