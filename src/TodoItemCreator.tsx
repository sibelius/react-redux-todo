import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({
      type: 'TODO_ADD',
      todo:
      {
        id: getId(),
          text: inputValue,
        isComplete: false,
      },
    })
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default React.memo(TodoItemCreator);