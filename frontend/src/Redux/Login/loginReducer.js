import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR } from '../reduxTypes';

const initialState = {
    loading: false,
    user: null,
    error: null,
}

const loginReducer = (state = initialState, action) => {

    switch(action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            loading: true,
        }

        case LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            user: action.payload.user,
            error: null,
        }

        case LOGIN_ERROR: return {
            ...state,
            loading: false,
            user: null,
            error: action.payload.error,
        }

        default: return state 
    }

}

export default loginReducer