import React from 'react';
import ReactDOM from 'react-dom';
import AppRenderer from './components/appRenderer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as constants from './constants/constants'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import authorize from './reducers/authorize'
import expenses from './reducers/expenses'
import renderer from './reducers/renderer'
import thunkMiddleware from 'redux-thunk'

const initialState = {
    renderer: {
       isLoading: true 
    },
    expenses: {
        expenses: [],
        addExpenseDialogOpen: false,
        expenseEditorOpen: false
    },
    authorize: {
        user: JSON.parse(sessionStorage.getItem(constants.userSessionKey))
    }
};

const combinedReducers = combineReducers({authorize, expenses, renderer})

const store = createStore(combinedReducers, initialState, applyMiddleware(thunkMiddleware))

ReactDOM.render(
    <Provider store={store}><AppRenderer/></Provider>, document.getElementById('root'));
registerServiceWorker();
