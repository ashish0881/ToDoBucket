// import { SIGN_IN, SIGN_OUT } from "../actions/types";
import {
  CREATE_BUCKET,
  EDIT_BUCKET,
  DELETE_BUCKET,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO
} from "../actions/types";
import uuid from "uuid";

const INITIAL_STATE = [
  {
    id: "64513c8ab9ab",
    title: "Walmart",
    todos: [
      {
        id: uuid(),
        bucketId: "64513c8ab9ab",
        title: "Walmart Task 1",
        completed: false
      },
      {
        id: uuid(),
        bucketId: "64513c8ab9ab",
        title: "Walmart Task 2",
        completed: true
      }
    ]
  },
  {
    id: "526cfa7a2b94",
    title: "Oracle",
    todos: [
      {
        id: uuid(),
        bucketId: "526cfa7a2b94",
        title: "Oracle Task 1",
        completed: false
      },
      {
        id: uuid(),
        bucketId: "526cfa7a2b94",
        title: "Oracle Task 2",
        completed: false
      }
    ]
  }
];

const saveBucketsToStorage = state => {
  localStorage.setItem("buckets", JSON.stringify(state));
};

if (!localStorage.getItem("buckets")) {
  console.log("Initial buckets");
  saveBucketsToStorage(INITIAL_STATE);
}

const getBucketsFromStorage = () => {
  if (localStorage.getItem("buckets")) {
    return JSON.parse(localStorage.getItem("buckets"));
  }

  return INITIAL_STATE;
};

// Helper functions

const createBucketHelper = (state, action) => {
  const buckets = [
    ...state,
    { id: action.payload.id, title: action.payload.title, todos: [] }
  ];

  saveBucketsToStorage(buckets);
  return buckets;
};

const editBucketHelper = (state, action) => {
  const buckets = state.map(bucket => {
    if (bucket.id === action.payload.id) {
      return {
        ...bucket,
        title: action.payload.title
      };
    }
    return bucket;
  });
  saveBucketsToStorage(buckets);
  return buckets;
};

const deleteBucketHelper = (state, action) => {
  const buckets = state.filter(bucket => {
    if (bucket.id !== action.payload.bucketId) {
      return bucket;
    }
    return null;
  });
  saveBucketsToStorage(buckets);
  return buckets;
};

const addTodoHelper = (state, action) => {
  // console.log(action);
  const buckets = state.map(bucket => {
    if (bucket.id === action.payload.bucketId) {
      return {
        ...bucket,
        todos: [
          ...bucket.todos,
          {
            id: uuid(),
            bucketId: action.payload.bucketId,
            title: action.payload.title,
            completed: false
          }
        ]
      };
    }
    return bucket;
  });

  saveBucketsToStorage(buckets);

  return buckets;
};

const editTodoHelper = (state, action) => {
  const buckets = state.map(bucket => {
    if (bucket.id === action.payload.bucketId) {
      const updatedTodos = bucket.todos.map(todo => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            title: action.payload.title
          };
        }
        return todo;
      });

      return {
        ...bucket,
        todos: updatedTodos
      };
    }
    return bucket;
  });
  saveBucketsToStorage(buckets);
  return buckets;
};

const completeTodoHelper = (state, action) => {
  const buckets = state.map(bucket => {
    if (bucket.id === action.payload.bucketId) {
      const updatedTodos = bucket.todos.map(todo => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            completed: action.payload.completed
          };
        }
        return todo;
      });

      return {
        ...bucket,
        todos: updatedTodos
      };
    }
    return bucket;
  });
  saveBucketsToStorage(buckets);
  return buckets;
};

const deleteTodoHelper = (state, action) => {
  const buckets = state.map(bucket => {
    if (bucket.id === action.payload.bucketId) {
      const updatedTodos = bucket.todos.filter(todo => {
        if (todo.id !== action.payload.todoId) {
          return todo;
        }
        return null;
      });

      return {
        ...bucket,
        todos: updatedTodos
      };
    }
    return bucket;
  });
  saveBucketsToStorage(buckets);
  return buckets;
};

export default (state = getBucketsFromStorage(), action) => {
  switch (action.type) {
    case CREATE_BUCKET:
      return createBucketHelper(state, action);

    case EDIT_BUCKET:
      return editBucketHelper(state, action);

    case DELETE_BUCKET:
      return deleteBucketHelper(state, action);

    case ADD_TODO:
      return addTodoHelper(state, action);

    case EDIT_TODO:
      return editTodoHelper(state, action);

    case DELETE_TODO:
      return deleteTodoHelper(state, action);

    case COMPLETE_TODO:
      return completeTodoHelper(state, action);

    default:
      return state;
  }
};
