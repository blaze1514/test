import { DATA_SUCCESS, DATA_REQUEST, DATA_ERROR } from '../reduxTypes';

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const dataReducer = (state = initialState, action) => {

    switch(action.type) {
        case DATA_REQUEST: return {
            ...state,
            loading: true,
        }

        case DATA_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload.data,
            error: null,
        }

        case DATA_ERROR: return {
            ...state,
            loading: false,
            data: null,
            error: action.payload.error,
        }

        default: return state 
    }

}

export default dataReducer