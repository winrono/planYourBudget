import { SIGN_IN, CHANGE_PASSWORD, CHANGE_USERNAME } from '../constants/authorizationConstants'
import { GET_USER_EXPENSES, HANDLE_EXPENSES, TOGGLE_ADD_EXPENSE_DIALOG } from '../constants/expensesConstants'
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
    return async function (dispatch, getState) {

        var endpoint = WEBAPI_URL + "Expense/AddExpense"

        try {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense)
            }).then((json) => {
                if (json.ok){
                    dispatch(getUserExpenses(getState().authorize.user.uuid))
                }
            })
        }
        catch (e) {
            console.log('wtf!');
        }

    }
}

export function changeAddExpenseDialogState(payload) {
    return { type: TOGGLE_ADD_EXPENSE_DIALOG, payload: payload }
}


