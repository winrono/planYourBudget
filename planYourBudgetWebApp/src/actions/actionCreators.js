import { SIGN_IN, CHANGE_PASSWORD, CHANGE_USERNAME } from '../constants/authorizationConstants'
import { CHANGE_LOADING_STATE} from '../constants/renderingConstants'
import { GET_USER_EXPENSES, HANDLE_EXPENSES, TOGGLE_EXPENSE_EDITOR, ADD_CREATED_EXPENSE, REMOVE_SELECTED_EXPENSES, EDIT_EXPENSE, UPDATE_EXPENSE_UI } from '../constants/expensesConstants'
import fetchApi from '../http/fetchApi'

export function SignIn(uuid) {
    return { type: SIGN_IN, payload: uuid }
}

export function changeUsername(value) {
    return { type: CHANGE_USERNAME, payload: value }
}

export function changePassword(value) {
    return { type: CHANGE_PASSWORD, payload: value }
}

export function fetchExpenses(uuid) {
    return { type: GET_USER_EXPENSES, payload: uuid }
}

export function handleExpenses(data) {
    return { type: HANDLE_EXPENSES, payload: data }
}

export function getUserExpenses(uuid) {
    return async function (dispatch) {

        dispatch(fetchExpenses(uuid))

        var endpoint = "Expense/GetUserExpenses?uuid=" + uuid

        let result = await fetchApi(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let json = await result.json()

        dispatch(handleExpenses(json))
    }
}

export function addExpense(expense) {
    return async function (dispatch, getState) {

        var endpoint = "Expense/AddExpense"

        return new Promise((resolve, reject) => {
            try {
                fetchApi(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expense)
                }).then((response) => response.json()).then(
                    (json) => {
                        expense.expenseId = json;
                        dispatch(addCreatedExpense(expense))
                        dispatch(changeExpenseEditorState(false))
                        resolve()
                    }
                    )
            }
            catch (e) {
                reject()
            }
        })

    }
}

export function updateExpense(expense) {
    return async function (dispatch) {

        var endpoint = "Expense/UpdateExpense"

        return new Promise((resolve, reject) => {
            try {
                fetchApi(endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expense)
                }).then(
                    (json) => {
                        dispatch(changeExpenseEditorState(false))
                        dispatch(updateExpenseUI(expense))
                        resolve()
                    }
                    )
            }
            catch (e) {
                reject()
            }
        })
    }
}

export function changeExpenseEditorState(payload) {
    return { type: TOGGLE_EXPENSE_EDITOR, payload: payload }
}

export function addCreatedExpense(payload) {
    return { type: ADD_CREATED_EXPENSE, payload: payload }
}

export function updateExpenseUI(payload) {
    return { type: UPDATE_EXPENSE_UI, payload: payload }
}

export function removeSelectedExpenses(payload) {
    return async function (dispatch) {

        var endpoint = "Expense/DeleteExpenses"

        try {
            fetchApi(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then((json) => {
                if (json.ok) {
                    dispatch(removeExpensesUI(payload))
                }
            })
        }
        catch (e) {

        }

    }
}

export function removeExpensesUI(payload) {
    return { type: REMOVE_SELECTED_EXPENSES, payload: payload }
}

export function ChangeLoadingState(payload){
    return {type: CHANGE_LOADING_STATE, payload: payload }
}

