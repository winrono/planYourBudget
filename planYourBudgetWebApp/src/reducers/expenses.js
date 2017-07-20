import { GET_USER_EXPENSES, HANDLE_EXPENSES, TOGGLE_EXPENSE_EDITOR, ADD_CREATED_EXPENSE, REMOVE_SELECTED_EXPENSES, EDIT_EXPENSE } from '../constants/expensesConstants'

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
        case TOGGLE_EXPENSE_EDITOR:
            return {
                ...state,
                expenseEditorOpen: action.payload
            }
        case ADD_CREATED_EXPENSE:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    action.payload
                ]
            }
        case REMOVE_SELECTED_EXPENSES:
            return {
                ...state,
                expenses: state.expenses.filter((expense) => {
                    return !action.payload.includes(expense.expenseId)
                })
            }
        default:
            return state;
    }
}