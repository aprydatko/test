import {combineReducers, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'

import tasks from './tasks';
import auth from './auth';

let reducers = combineReducers({
    form: formReducer,
    tasks,
    auth
})

const store = createStore(reducers);

export default store;