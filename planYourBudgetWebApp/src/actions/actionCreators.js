import {SIGN_IN, CHANGE_PASSWORD, CHANGE_USERNAME} from '../constants/authorizationConstants'
import {GET_USER_EXPENSES, HANDLE_EXPENSES} from '../constants/expensesConstants'
import {WEBAPI_URL} from '../constants/constants'

export function SignIn() {
    return {
        type: SIGN_IN,
        payload: {
            name: 'Test',
            password: 'teeeeest'
        }
    }
}

export function changeUsername(value) {
    return {type: CHANGE_USERNAME, payload: value}
}

export function changePassword(value) {
    return {type: CHANGE_PASSWORD, payload: value}
}

export function fetchExpenses(uuid) {
    return {type: GET_USER_EXPENSES, payload: uuid}
}

export function handleExpenses(data){
    return {type: HANDLE_EXPENSES, payload: data}
}

export function getUserExpenses(uuid) {
    return async function (dispatch){

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
