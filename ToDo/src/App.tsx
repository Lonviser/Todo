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

  return (
    <>
      <Header title="Мои задачи" subTitle="План на сегодня" />
      
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='submit'>Добавить</button>
        </form>
 
    </>
  )
}

export default App