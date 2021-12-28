import * as todoConstants from "../constants/Todo";
var initialState = {
  ListTodo: {
    meta: {
      pagination: {},
    },
    data: [{}],
  },
};

const Todo = (state = initialState, action) => {
  switch (action.type) {
    case todoConstants.FETCH_TODO: {
      return {
        ...state,
      };
    }
    case todoConstants.FETCH_TODO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        ListTodo: data,
      };
    }
    case todoConstants.SET_TODO_EDITING: {
      const { todo } = action.payload;
      return {
        ...state,
        editing: todo,
      };
    }

    case todoConstants.ADD_TODO: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default Todo;
