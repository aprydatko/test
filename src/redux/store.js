import {combineReducers, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'

import tasks from './tasks';

let reducers = combineReducers({
    form: formReducer,
    tasks,
})

const store = createStore(reducers);

export default store;