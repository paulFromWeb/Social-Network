import { combineReducers } from "redux"
import authReducer from "./authReducer"
import dialogsReducer from "./dialogsReducer"
import homeReducer from "./homeReducer"
import profileReducer from "./profileReducer"
import usersReducer from "./usersReducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer"
import { createStore, applyMiddleware, compose } from 'redux';
let rootReducer = combineReducers({
    messagesPage: dialogsReducer,
    homePage: homeReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
export default store;