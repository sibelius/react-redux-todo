import React from 'react';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';
import { Text } from 'rebass';
import TodoListFilters from './TodoListFilters';
import TodoListStats from './TodoListStats';
import { useSelector } from 'react-redux';
import { getVisibleTodos } from './store';

const App = () => {
  const todoList = useSelector(getVisibleTodos);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <Text mt='10px' mb='10px'>Todos</Text>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

export default App;
