import type { Todo } from '../types'  
import './TodoItem.css'  

interface TodoItemProps {
  todo: Todo; 
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <input 
        type="checkbox"
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </li>
  )
}
export default TodoItem