import { useState } from 'react'
import Header from './components/Header.tsx'

// 1. Интерфейс задачи. Имена полей: id, text, completed
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  // 2. Инициализируем state массивом с начальными данными
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Настроить Vite + TS', completed: true },
    { id: '2', text: 'Понять useState', completed: false },
    { id: '3', text: 'Добавить форму создания', completed: false },
  ])

  const [inputValue, setInputValue] = useState('')

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
  return (
    <>
      <Header title="Мои задачи" subTitle="План на сегодня" />
      
      <ul>
        {/* 3. map создаёт новый массив React-элементов */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* 4. Используем ТЕ ЖЕ имена, что в интерфейсе */}
            {todo.completed ? '✅' : '⬜'} {todo.text}
          </li>
        ))}
      </ul>

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