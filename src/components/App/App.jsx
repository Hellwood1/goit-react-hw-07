import css from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoading } from '../../redux/contactsSlice';
import { fetchContacts } from '../../redux/contactsOps';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const isError = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {isLoading ? <Loader/> : <ContactList />}
        {isError && (
          <p className={css.error}>
            Wooops. Something wrong. Please, try again!
          </p>
        )}
      </div>
    </>
  )
}

export default App
