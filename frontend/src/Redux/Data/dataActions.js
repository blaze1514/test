import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from '../reduxTypes';

export const dataRequest = () => {
    return {
        type: DATA_REQUEST,
    }
}

export const dataSuccess = (data) => {
    return {
        type: DATA_SUCCESS,
        payload: {
            data,
        }
    }
}

export const dataError = (error) => {
    return {
        type: DATA_ERROR,
        payload: {
            error,
        }
    }
}