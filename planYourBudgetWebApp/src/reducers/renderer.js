import {CHANGE_LOADING_STATE} from '../constants/renderingConstants'

export default function renderer(state = null, action) {

    switch (action.type) {
        case CHANGE_LOADING_STATE:
        return {
            ...state,
            isLoading: action.payload
        }
        default:
            return state;
    }
}