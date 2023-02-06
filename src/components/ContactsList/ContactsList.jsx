import { List, Link, ButtonDelete } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import { getContacts, getValue } from 'redux/selectors';

const ContactsList = () => {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getValue);
    const dispatch = useDispatch();
    
  const filterContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = Id => {
    dispatch(deleteContact(Id));
  };

  return (
    <List>
      {filterContacts.map(({ id, name, number }) => (
        <Link key={id}>
          <div className="contact">
            <h2 className="contactName">{name}</h2>
            <p>{number}</p>
            <ButtonDelete type="button" onClick={() => handleDelete(id)}>
              Delete
            </ButtonDelete>
          </div>
        </Link>
      ))}
    </List>
  );
};

export default ContactsList;