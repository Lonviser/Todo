import TodoItem from './TodoItem'
import type { Todo } from '../types'
import './TodoList.css'
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
export default TodoList