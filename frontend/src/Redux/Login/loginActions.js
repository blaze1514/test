import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../reduxTypes';

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user,
        }
    }
}

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error,
        }
    }
}