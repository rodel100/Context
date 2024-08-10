import { configureStore } from '@reduxjs/toolkit'
import LoggedinReducer from './loggedInReducer'
import PromptReducer from './PromptReducer'

export default configureStore({
  reducer: {
    isLoggedIn: LoggedinReducer,
    prompt: PromptReducer
  }
})