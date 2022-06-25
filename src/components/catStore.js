import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../redux/searchSlice'

const catStore = configureStore({
    reducer: {
        search: searchReducer
    }
})

export default catStore