import { combineReducers } from 'redux';
import loginReducer from './Login/loginReducer';
import dataReducer from './Data/dataReducer'; 

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
})

export default rootReducer;