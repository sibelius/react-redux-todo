import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TodoListFilters = () => {
  const filter = useSelector(state => state.visibilityFilter);
  const dispatch = useDispatch();

  const updateFilter = ({target: {value}}) => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: value,
    });
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

export default React.memo(TodoListFilters);