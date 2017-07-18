import {GET_USER_EXPENSES, HANDLE_EXPENSES, TOGGLE_ADD_EXPENSE_DIALOG} from '../constants/expensesConstants'

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
        case TOGGLE_ADD_EXPENSE_DIALOG:
        return {
            ...state,
            addExpenseDialogOpen: action.payload
        }
        default:
            return state;
    }
}