import { createStore, combineReducers } from "redux";
import { replaceItemAtIndex, removeItemAtIndex } from "./helpers";
import { createSelector } from 'reselect'

const todos = (state = [], action) => {
  switch (action.type) {
    case "TODO_ADD": {
      const { todo } = action;

      return [...state, todo];
    }
    case "TODO_EDIT": {
      const { todo, index } = action;
      return replaceItemAtIndex(state, index, todo);
    }
    case "TODO_DELETE": {
      const { index } = action;
      return removeItemAtIndex(state, index);
    }
    default:
      return state;
  }
};

const visibilityFilter = (state = 'Show All', action) => {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

const reducer = combineReducers({ todos, visibilityFilter });
const store = createStore(reducer);

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    console.log('v: ', {
      visibilityFilter,
      todos,
    });
    switch (visibilityFilter) {
      case 'Show All':
        return todos
      case 'Show Completed':
        return todos.filter(t => t.isComplete)
      case 'Show Uncompleted':
        return todos.filter(t => !t.isComplete)
      default:
        return todos;
    }
  }
);

export const getTodoListStats = createSelector(
  [ getVisibleTodos ],
  (visibleTodos) => {
    const totalNum = visibleTodos.length;
    const totalCompletedNum = visibleTodos.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  }
)

export default store;
