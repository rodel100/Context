import { configureStore } from '@reduxjs/toolkit'
import LoggedinReducer from './loggedInReducer'

export default configureStore({
  reducer: {
    isLoggedIn: LoggedinReducer
  }
})