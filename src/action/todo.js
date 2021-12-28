import * as todoConstants from '../constants/Todo';
import { toastError, toastInfo, toastSuccess } from '../components/Toastify';

export const fetchListTodo = (params = {}) => {
  return {

    type: todoConstants.FETCH_TODO,
    payload: {
      params,
    },
  };
};

export const fetchListTodoSuccess = data => {
  return {
    type: todoConstants.FETCH_TODO_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTodoFailed = error => {
  return {
    type: todoConstants.FETCH_TODO_FAILED,
    payload: {
      error,
    },
  };
};

export const filterTodo = keyword => ({
  type: todoConstants.FILTER_TODO,
  payload: {
    keyword,
  },
});

export const filterTodoSuccess = data => ({
  type: todoConstants.FILTER_TODO_SUCCESS,
  payload: {
    data,
  },
});

export const addTodo = (todo) => {
  return {
    type: todoConstants.ADD_TODO,
    payload: todo
  };
};

export const addTodoSuccess = data => {
  toastSuccess('Add todo success!');
  return {
    type: todoConstants.ADD_TODO_SUCCESS,
    payload: {
      data
  },
  };
};

export const addTodoFailed = error => {
  toastError(error);
  return {
    type: todoConstants.ADD_TODO_FAILED,
  };
};

export const setTodoEditing = todo => {
  return {
    type: todoConstants.SET_TODO_EDITING,
    payload: {
      todo,
    },
  };
};


export const updateTodo = (data) => {
  return {
    type: todoConstants.UPDATE_TODO,
    payload: {
        data
    },
  };
};

export const updateTodoSuccess = data => {
  toastInfo('Update todo success!');
  return {
    type: todoConstants.UPDATE_TODO_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateTodoFailed = error => {
  toastError(error);
  return {
    type: todoConstants.UPDATE_TODO_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteTodo = id => {
  return {
    type: todoConstants.DELETE_TODO,
    payload: {
      id,
    },
  };
};

export const deleteTodoSuccess = data => {
  toastSuccess('Delete todo success!');
  return {
    type: todoConstants.DELETE_TODO_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteTodoFailed = error => {
  toastError(error);
  return {
    type: todoConstants.DELETE_TODO_FAILED,
    payload: {
      error,
    },
  };
};
