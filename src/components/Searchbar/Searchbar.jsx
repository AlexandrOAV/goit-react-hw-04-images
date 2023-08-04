import { Formik, Form, Field } from 'formik';
import css from './Searchbar.module.css'
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify';


export const Searchbar = ({ onSubmit }) => {
  const submitSerchbar = (values, actions) => {
    if (values.serchText.trim() === '') {
      return toast.error('Please enter a query to search',
        {
          position: "top-center",
          autoClose: 2000,
        })
    }
    onSubmit(values.serchText);
     actions.resetForm();
  }

    return (
      <header className={css.Searchbar}>
        <Formik
          initialValues={{ serchText: '' }}
          onSubmit={submitSerchbar}
        >
          <Form className={css.SearchForm}>
            <button type="submit" value='submit' className={css.SearchForm_button}>
              <BsSearch className={css.SearchForm_button_label} />
            </button>
            <Field
              name='serchText'
              className={css.SearchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            /> 
          </Form>
        </Formik>
      </header>
    )
  }
