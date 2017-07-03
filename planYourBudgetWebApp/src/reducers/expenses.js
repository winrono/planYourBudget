import {GET_USER_EXPENSES, HANDLE_EXPENSES} from '../constants/expensesConstants'

const initialState = {
  expenses: []
}

export default function expenses(state = initialState, action) {

    switch (action.type) {
        case HANDLE_EXPENSES:
        var res = {
            ...state,
            expenses: action.payload
        }
            return res;
        default:
            return state;
    }
}