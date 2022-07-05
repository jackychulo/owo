import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../redux/searchSlice'

// Create the root reducer separately so we can extract the RootState type
/* const rootReducer = combineReducers({
    user: userReducer,....
}) */

const catStore = configureStore({
    reducer: {
        search: searchReducer
    }
})

export default catStore