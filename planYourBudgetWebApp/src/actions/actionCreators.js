import { SIGN_IN, CHANGE_PASSWORD, CHANGE_USERNAME } from '../constants/authorizationConstants'
import { GET_USER_EXPENSES, HANDLE_EXPENSES, TOGGLE_ADD_EXPENSE_DIALOG, ADD_CREATED_EXPENSE, REMOVE_SELECTED_EXPENSES } from '../constants/expensesConstants'
import { WEBAPI_URL } from '../constants/constants'

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

        var endpoint = WEBAPI_URL + "Expense/GetUserExpenses?uuid=" + uuid

        let result = await fetch(endpoint, {
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
    return async function (dispatch) {

        var endpoint = WEBAPI_URL + "Expense/AddExpense"

        return new Promise((resolve, reject) => {
            try {

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expense)
                }).then((response) => response.json()).then(
                    (json) => {
                        expense.expenseId = json;
                        dispatch(addCreatedExpense(expense))
                        dispatch(changeAddExpenseDialogState(false))
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

export function changeAddExpenseDialogState(payload) {
    return { type: TOGGLE_ADD_EXPENSE_DIALOG, payload: payload }
}

export function addCreatedExpense(payload) {
    return { type: ADD_CREATED_EXPENSE, payload: payload }
}

export function removeSelectedExpenses(payload) {
    return async function (dispatch) {

        var endpoint = WEBAPI_URL + "Expense/DeleteExpenses"

        try {
            fetch(endpoint, {
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


