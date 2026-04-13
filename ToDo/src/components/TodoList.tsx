import TodoItem from './TodoItem';
import type { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;   // ← добавили
}

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}           // ← передаём функцию
        />
      ))}
    </ul>
  );
}

export default TodoList;