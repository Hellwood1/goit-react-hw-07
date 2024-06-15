import css from './SearchBox.module.css'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../../redux/filtersSlice'
import { useSelector } from 'react-redux'
import { selectNameFilter } from '../../redux/filtersSlice'

export default function SearchBox() {
  const filter = useSelector(selectNameFilter)
  const dispatch = useDispatch()

  return (
    <div className={css.search}>
      <label htmlFor='search-contact'>Find contacts by name</label>
      <input
        value={filter}
        className={css.input}
        id='search-contact'
        onChange={e => {
          const value = e.target.value.toLowerCase()
          dispatch(changeFilter(value))
        }}
      />
    </div>
  )
}
