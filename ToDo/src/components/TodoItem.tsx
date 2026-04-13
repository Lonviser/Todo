import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;   
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  // Локальное состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);


  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();   // Выделяем весь текст сразу
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (todo.completed) return;           
    setIsEditing(true);
    setEditValue(todo.text);              
  };


  const handleSave = () => {
    const trimmedText = editValue.trim();

    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);      
    }

    setIsEditing(false);                 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(todo.text);              
  };

  // Обработка клавиш Enter и Escape
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="todo-item">

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}            
      />


      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}                    
          onKeyDown={handleKeyDown}
          className="edit-input"
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: todo.completed ? 'default' : 'pointer',
            flex: 1,
            padding: '0.5rem 0'
          }}
        >
          {todo.text}
        </span>
      )}

 
      <button onClick={() => onDelete(todo.id)} title="Удалить задачу">
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;