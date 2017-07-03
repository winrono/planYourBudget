import {SIGN_IN, CHANGE_USERNAME, CHANGE_PASSWORD} from '../constants/authorizationConstants'

export default function authorize(state = null, action) {

    switch (action.type) {
        case CHANGE_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    uuid: action.payload
                }
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.payload
                }
            }
        default:
            return state;
    }
}