import './App.css'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import type { Todo } from './types'

const defaultTodos: Todo[] = [
  { id: '1', text: 'Настроить Vite + TS', completed: true },
  { id: '2', text: 'Понять useState', completed: false },
  { id: '3', text: 'Добавить форму создания', completed: false },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : defaultTodos
    } catch {
      return defaultTodos
    }
  })

  const [inputValue, setInputValue] = useState('')
  type FilterType = 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim();
    if (!text) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    }
    setTodos(prev => [...prev, newTodo])
    setInputValue('');
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className='app'>
      <Header title="Мои задачи" subTitle="План на сегодня" />

      <p className='task-counter'>
        Осталось задач: {todos.filter(t => !t.completed).length}
      </p>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          Все
        </button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
          Активные
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Завершённые
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>
            {filter === 'active' && '✨ Нет активных задач'}
            {filter === 'completed' && '✅ Нет завершённых задач'}
            {filter === 'all' && '📝 Список задач пуст. Добавь первую!'}
          </p>
        </div>
      ) : (
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}

      <form className="add-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите задачу..."
            className="todo-input"
          />
          <button type="submit" className="submit-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Добавить
          </button>
        </div>
      </form>
    </div>
  )
}

export default App