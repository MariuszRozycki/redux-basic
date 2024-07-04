import configureStore from 'redux';

// 1. State

const defaultState = {
  todos: [],
  example: { isChanged: false }
};

// 2. Actions

const exampleAction = {
  type: "TYP_AKCJI",
  payload: {} // opcjonalnie
};

const TODOS_ACTIONS_TYPES = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  REMOVE_ALL: "REMOVE_ALL"
};

const exampleAction2 = {
  type: TODOS_ACTIONS_TYPES.ADD,
  payload: {}
};

// 3. Actions Creators

const addToDo = (message) => ({
  type: TODOS_ACTIONS_TYPES.ADD,
  payload: { id: Date.now(), message }
});

const deleteToDo = (id) => ({
  type: TODOS_ACTIONS_TYPES.DELETE,
  payload: id
});

const updateToDo = (id, message) => ({
  type: TODOS_ACTIONS_TYPES.UPDATE,
  payload: { id, message }
});

const removeAll = () => ({
  type: TODOS_ACTIONS_TYPES.REMOVE_ALL
});

// 4. Reducer

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TODOS_ACTIONS_TYPES.ADD:
      return { ...state, todos: [...state.todos, action.payload] };

    case TODOS_ACTIONS_TYPES.DELETE:
      const filteredTodos = state.todos.filter(
        ({ id }) => id !== action.payload
      );
      return { ...state, todos: filteredTodos };

    case TODOS_ACTIONS_TYPES.UPDATE:
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            message: action.payload.message
          };
        }
        return todo;
      });
      return { ...state, todos };

    case TODOS_ACTIONS_TYPES.REMOVE_ALL:
      return { ...state, todos: [] };

    default:
      return state;
  }
};

const store = configureStore(reducer);
console.log(store.getState());
