import { useState } from 'react'
import './App.css'
import { TodoListItem } from './TodolistItem'
import { Task } from './types'
import { TodoFilterButton } from './enum'





export const App = () => {
  const date: Date = new Date()
  const ruDate: string = date.toLocaleDateString('ru-RU')
  const [filter, setFilter] = useState<TodoFilterButton>(TodoFilterButton.ALL)

  const changeFilter = (filter: TodoFilterButton) => {
    setFilter(filter)
  }
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ])

  let filteredTasks = tasks
  if (filter === TodoFilterButton.COMPLETED) {
    filteredTasks = tasks.filter(el => el.isDone)
  }
  if (filter === TodoFilterButton.ACTIVE) {
    filteredTasks = tasks.filter(el => !el.isDone)
  }
  const deleteAllTasks = () => {
    setTasks([])
  }
  const deleteTask = (taskId: number) => {
    const filtredTasks = tasks.filter(el => el.id !== taskId)
    setTasks(filtredTasks)
  }

  return (
    <div className="app">
      <TodoListItem title={'What to learn'} tasks={filteredTasks} date={ruDate} deleteTask={deleteTask} changeFilter={changeFilter} deleteAllTasks={deleteAllTasks}/>
    </div>
  )
}


