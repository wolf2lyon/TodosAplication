import { useState } from 'react'
import { Todos } from './components/Todos'
import { type Todo as TodoType, type TodoId, type FileterValue, type TodoTitle } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'Ver eL Twitch de midu',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React con TypeScript',
    completed: false
  },
  {
    id: '3',
    title: 'Sacar ticket de la miduFest',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FileterValue>(TODO_FILTERS.ALL)
  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }
  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }
  const handleFilterChange = (filter: FileterValue): void => {
    setFilterSelected(filter)
  }
  const handleRemoveAllCompletede = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount
  const filterTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })
  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos
      onToggleCompleteTodo = {handleCompleted}
      onRemoveTodo = {handleRemove}
      todos = {filterTodos} />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompletede}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
