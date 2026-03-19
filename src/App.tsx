import { useState } from 'react'
import './App.css'
import { TodoListItem } from './TodolistItem'
import { FilterValue, Task } from './types'
import { v1 } from 'uuid'





export const App = () => {
  const date: Date = new Date()
  const ruDate: string = date.toLocaleDateString('ru-RU')
  const [filter, setFilter] = useState<FilterValue>('all')

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeFilter = (filter: FilterValue) => {
    setFilter(filter)
  }

  let filteredTasks = tasks
  if (filter === 'completed') {
    filteredTasks = tasks.filter(el => el.isDone)
  }
  if (filter === 'active') {
    filteredTasks = tasks.filter(el => !el.isDone)
  }
  const deleteAllTasks = () => {
    setTasks([])
  }
  const deleteTask = (taskId: string) => {
    const filtredTasks = tasks.filter(el => el.id !== taskId)
    setTasks(filtredTasks)
  }

  return (
    <div className="app">
      <TodoListItem title={'What to learn'}
        tasks={filteredTasks}
        date={ruDate} deleteTask={deleteTask}
        changeFilter={changeFilter}
        deleteAllTasks={deleteAllTasks}
        createTask={createTask}
      />
    </div>
  )
}


