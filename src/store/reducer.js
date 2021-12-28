import { combineReducers } from 'redux';
import todo from './todo';
import modal from '../store/modal';
import PermissionRoles from '../store/permissions';
import { reducer as formReducer } from 'redux-form'
// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    modal,
    todo,
    PermissionRoles,
    form:formReducer,
});

export default reducer;
