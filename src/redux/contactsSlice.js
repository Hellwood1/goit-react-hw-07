import { createSlice, createSelector } from '@reduxjs/toolkit'
import { fetchContacts, addContact, deleteContact } from './contactsOps'
import { selectNameFilter } from './filtersSlice'

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchContacts.rejected, state => {
        state.loading = false
        state.error = true
      })
      .addCase(addContact.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(addContact.rejected, state => {
        state.loading = false
        state.error = true
      })
      .addCase(deleteContact.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.items = state.items.filter(el => el.id !== action.payload.id)
      })
      .addCase(deleteContact.rejected, state => {
        state.loading = false
        state.error = true
      })
  },
})

export default slice.reducer

export const selectContacts = state => state.contacts.items

export const selectLoading = state => state.contacts.loading

export const selectError = state => state.contacts.error

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
)
