import { useState } from 'react'
import Header from './components/Header'

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

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    )
  }

  const deleteTodo = (id:string)=>{
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <>
      <Header title="Мои задачи" subTitle="План на сегодня" />
      
      <ul>
        {/* 3. map создаёт новый массив React-элементов */}
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={()=> toggleTodo(todo.id)}
              />
              <span style={{textDecoration: todo.completed  ? 'line-through' : 'none'}}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
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