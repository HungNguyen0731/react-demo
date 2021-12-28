import {ACTIONS} from "./actions";
import  {ROLES} from "../constants/permissions.js";

var initialState = {
  authorization: {
    roles: [ROLES.CREATE],
  },
};

const PermissionRoles = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ROLE:
      return {
        ...state,
        authorization: {
          ...state.authorization,
          roles: [...new Set([...state.authorization.roles, role])],
        },
      };
    case ACTIONS.REMOVE_ROLE:
      return {
        ...state,
        authorization: {
          roles: [...state.authorization.roles.filter(oldRole => oldRole !== role)],
        },
      };

    default:
      return state;
    }
};

export default PermissionRoles;
