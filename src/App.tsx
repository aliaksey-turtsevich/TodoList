import './App.css'
import { TodoListItem } from './TodolistItem'
import { Task } from './types'




export const App = () => {
const date: Date = new Date()
const ruDate: string = date.toLocaleDateString('ru-RU')
  const tasks1: Task[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ]

  return (
    <div className="app">
      <TodoListItem title={'What to learn'} tasks={tasks1} date={ruDate} />
    </div>
  )
}


