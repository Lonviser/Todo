import { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import type { Todo } from './types'

// Дефолтные задачи (покажутся только если хранилище пустое)
const defaultTodos: Todo[] = [
  { id: '1', text: 'Настроить Vite + TS', completed: true },
  { id: '2', text: 'Понять useState', completed: false },
  { id: '3', text: 'Добавить форму создания', completed: false },
]

function App() {
  // Инициализируем state массивом с начальными данными
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

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  // Добавление новой задачи
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const text = inputValue.trim();
    if(!text) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    }
    setTodos(prev => [...prev, newTodo])
    setInputValue('');
  }

  // Переключение статуса задачи

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    )
  }
  // удаление задачи

  const deleteTodo = (id:string)=>{
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo =>{
    if(filter === 'all'){
      return true
    }else if (filter === 'active'){
      return !todo.completed
    }else if (filter === 'completed'){
      return todo.completed
    }
    })



  return (
    <>
      <Header title="Мои задачи" subTitle="План на сегодня" />

      <div className="filters" style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('completed')}>Завершённые</button>
      </div>

      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Осталось задач: {todos.filter(t => !t.completed).length}
      </p>

      {filteredTodos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          {filter === 'active' && 'Нет активных задач'}
          {filter === 'completed' && 'Нет завершённых задач'}
          {filter === 'all' && 'Список задач пуст. Добавь первую!'}
        </p>
      ) : (
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
  
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введи задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
 
    </>
  )
}

export default App