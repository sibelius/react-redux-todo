import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todos);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    dispatch({
      type: 'TODO_EDIT',
      index,
      todo: {
        ...item,
        text: value,
      },
    })
  };

  const toggleItemCompletion = () => {
    dispatch({
      type: 'TODO_EDIT',
      index,
      todo: {
        ...item,
        isComplete: !item.isComplete,
      },
    })
  };

  const deleteItem = () => {
    dispatch({
      type: 'TODO_DELETE',
      index,
    });
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default React.memo(TodoItem);