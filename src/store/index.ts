import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { contactsReducer } from "./reducers/contacts";
import { usersReducer } from "./reducers/users";

interface UserType {
    login: string,
    id: number
}

const rootReducer = combineReducers({
    users: usersReducer,
    contacts: contactsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch