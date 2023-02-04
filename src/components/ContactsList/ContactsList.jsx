import React from "react";
import PropTypes from 'prop-types';
import { List, Link, ButtonDelete } from "./ContactsList.styled";

const ContactsList = ({ contacts, onDeleteContact }) => {

    return (
      <List>
        {contacts.map(({ id, name, number }) => (
          <Link key={id}>
            <div className="contact">
              <h2 className="contactName">{name}</h2>
              <p>{number}</p>
              <ButtonDelete type="button" onClick={() => onDeleteContact(id)}>
                Delete
              </ButtonDelete>
            </div>
          </Link>
        ))}
      </List>
    );
};

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};