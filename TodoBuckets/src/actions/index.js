// import axios from "../apis/axios";
// import history from "../history";

import {
  CREATE_BUCKET,
  EDIT_BUCKET,
  DELETE_BUCKET,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO
} from "./types";

export const createBucket = (id, title) => {
  return {
    type: CREATE_BUCKET,
    payload: { id, title }
  };
};

export const editBucket = (id, title) => {
  return {
    type: EDIT_BUCKET,
    payload: { id, title }
  };
};

export const deleteBucket = bucketId => {
  return {
    type: DELETE_BUCKET,
    payload: { bucketId }
  };
};

export const addTodo = (bucketId, title) => {
  return {
    type: ADD_TODO,
    payload: { bucketId, title }
  };
};

export const editTodo = (bucketId, todoId, title) => {
  return {
    type: EDIT_TODO,
    payload: { bucketId, todoId, title }
  };
};

export const deleteTodo = (bucketId, todoId) => {
  return {
    type: DELETE_TODO,
    payload: { bucketId, todoId }
  };
};

export const completeTodo = (bucketId, todoId, completed) => {
  return {
    type: COMPLETE_TODO,
    payload: { bucketId, todoId, completed }
  };
};
