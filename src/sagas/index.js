import {
  call,
  select,
  put,
  takeLatest,
  takeEvery,
  delay,
} from "redux-saga/effects";
import { getList, addTodo, updateTodo, deleteTodo } from "./../apis/Todo";
import { STATUS_CODE } from "../constants";
import { hideModal } from "../action/modal";
import * as ActionTypes from "../action/todo";
import * as TodoTypes from "../constants/Todo";

function* watchFetchListTodoAction(action) {
  while (true) {
    yield delay(100);
    const { params } = action.payload;
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(ActionTypes.fetchListTodoSuccess(data));
      break;
    } else {
      yield put(ActionTypes.fetchListTodoFailed(data));
    }
  }
}
function* addTodoSaga({ payload }) {
  const { title, due_on } = payload;
  const resp = yield call(addTodo, {
    title,
    due_on,
    status: "pending",
    user_id: "1239",
  });
  console.log(resp);

  const { data, status } = resp;
  const page = yield select(
    (state) => state.todo.ListTodo.meta.pagination.pages
  );
  if (status === STATUS_CODE.CREATED) {
    yield put(ActionTypes.fetchListTodo({ page: page }));
    yield put(ActionTypes.addTodoSuccess(data));
  } else {
    yield put(ActionTypes.addTodoFailed(data));
  }
}
function* updateTodoSaga({ payload }) {
  const resp = yield call(updateTodo, payload);

  const { data, status: statusCode } = resp;
  console.log(resp)

  if (statusCode === STATUS_CODE.SUCCESS) {
    const page = yield select(
      (state) => state.todo.ListTodo.meta.pagination.page
    );
    yield put(ActionTypes.fetchListTodo({ page: page }));
    yield put(hideModal());
    yield put(ActionTypes.updateTodoSuccess(data));
  } else {
    yield put(ActionTypes.updateTodoFailed(data));
  }
}
function* deleteTodoSaga({ payload }) {
  const { id } = payload;
  const resp = yield call(deleteTodo, id);
  const { data, status: statusCode } = resp;

  if (statusCode === STATUS_CODE.DELETED) {
    const page = yield select(
      (state) => state.todo.ListTodo.meta.pagination.page
    );
    yield put(ActionTypes.fetchListTodo({ page: page }));
    yield put(hideModal());
    yield put(ActionTypes.deleteTodoSuccess(data));
  } else {
    yield put(ActionTypes.deleteTodoFailed(data));
  }
}

export function* rootSaga() {
  yield takeLatest(TodoTypes.FETCH_TODO, watchFetchListTodoAction);
  yield takeEvery(TodoTypes.ADD_TODO, addTodoSaga);
  yield takeLatest(TodoTypes.UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TodoTypes.DELETE_TODO, deleteTodoSaga);
}
