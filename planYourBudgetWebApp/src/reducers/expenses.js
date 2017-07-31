import {
    GET_USER_EXPENSES,
    HANDLE_EXPENSES,
    TOGGLE_EXPENSE_EDITOR,
    ADD_CREATED_EXPENSE,
    REMOVE_SELECTED_EXPENSES,
    EDIT_EXPENSE,
    UPDATE_EXPENSE_UI
} from '../constants/expensesConstants'
import * as date from '../utils/date'

const initialState = {
    expenses: []
}

export default function expenses(state = initialState, action) {

    switch (action.type) {
        case HANDLE_EXPENSES:
            //TODO: to change server logics to return items in reverse order
            if (!action.payload) {
                return state
            }
            action
                .payload
                .forEach(function (expense, id) {
                    expense.createdDateTime = date.formatDate(expense.createdDateTime)
                })
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
                //adjust after previous TODO
                ...state,
                expenses: [
                    ...state.expenses,
                    action.payload
                ]
            }
        case REMOVE_SELECTED_EXPENSES:
            return {
                ...state,
                expenses: state
                    .expenses
                    .filter((expense) => {
                        return !action
                            .payload
                            .includes(expense.expenseId)
                    })
            }
        case UPDATE_EXPENSE_UI:
            var updatedExpenseId = state
                .expenses
                .findIndex(x => x.expenseId === action.payload.expenseId)
                var updatedExpenses = state
                .expenses
                .slice(0, updatedExpenseId)
                .concat(action.payload)
                .concat(state.expenses.slice(updatedExpenseId + 1))
                return {
                    ...state,
                    expenses: updatedExpenses
                }

        default:
            return state;
    }
}