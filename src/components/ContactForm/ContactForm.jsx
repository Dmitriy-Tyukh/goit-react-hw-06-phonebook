import * as yup from 'yup';
import { Formik } from 'formik';
import {FormStyled, FieldStyled, ErrorMessagetyled, Label, ButtonSubmit} from './ContactForm.styled';
import { nanoid } from 'nanoid';
import { createContact } from 'redux/contactSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';

const initialValues = {
  name: '',
  number: '',
};

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(7).max(10).required(),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const submitForm = ({ name, number }, { resetForm }) => {
    const nameContact = name;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    dispatch(createContact(newContact));
    resetForm();

    if (contacts.some(({ name }) => name === nameContact)) {
      alert(`${nameContact} is already in contacts.`);
      return;
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={submitForm}
    >
      <FormStyled autoComplete="off">
        <Label>
          Name
          <FieldStyled type="text" name="name" placeholder="Name" />
          <ErrorMessagetyled name="name" component="div" />
        </Label>

        <Label>
          Number
          <FieldStyled type="tel" name="number" placeholder="Number" />
          <ErrorMessagetyled component="div" name="number" />
        </Label>

        <ButtonSubmit type="submit">Add contacts</ButtonSubmit>
      </FormStyled>
    </Formik>
  );
};

export default ContactForm;