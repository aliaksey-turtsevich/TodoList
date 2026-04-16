import { useState } from 'react'
import './App.css'
import { TodoListItem } from './TodolistItem'
import { FilterValues, TasksState, TodoList } from './types'
import { v1 } from 'uuid'
import { CreateItemForm } from './CreateItemForm'





export const App = () => {
  const date: Date = new Date()
  const ruDate: string = date.toLocaleDateString('ru-RU')

  const todolist1 = v1()
  const todolist2 = v1()


  const [todoLists, setTodolists] = useState<TodoList[]>([
    { id: todolist1, title: 'What to learn', filter: 'all' },
    { id: todolist2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>
    ({
      [todolist1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolist2]: [
        { id: v1(), title: 'Milk', isDone: true },
        { id: v1(), title: 'Bread', isDone: true },
        { id: v1(), title: 'Eggs', isDone: false },
      ]
    }
    )

  const createTask = (todoListId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = { ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] }
    setTasks(newTasks)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task),
    }
    setTasks(newTasks)
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task) })
  }

  const changeFilter = (todoListId: string, filter: FilterValues) => {
    setTodolists(tl => tl.map(t => t.id === todoListId ? { ...t, filter } : t))
  }


  const deleteTask = (todoListId: string, taskId: string) => {
    const newTasks = {
      ...tasks,
      [todoListId]: tasks[todoListId].filter(task => task.id !== taskId),
    }
    setTasks(newTasks)
  }

  const createTodolist = (title: string) => {
    const newTodoListId = v1()
    const newTodolist: TodoList = { id: newTodoListId, title, filter: 'all' }
    setTodolists([newTodolist, ...todoLists])
    setTasks({ ...tasks, [newTodoListId]: [] })
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todoLists.map(tl => tl.id === todolistId ? { ...tl, title } : tl))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todoLists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  return (
    <div className="app">
      <CreateItemForm onCreateItem={createTodolist} />
      {todoLists.map(tl => {
        const todolistTasks = tasks[tl.id]
        let filteredTasks = todolistTasks
        if (tl.filter === 'completed') {
          filteredTasks = todolistTasks.filter(el => el.isDone)
        }
        if (tl.filter === 'active') {
          filteredTasks = todolistTasks.filter(el => !el.isDone)
        }
        return <TodoListItem
          key={tl.id}
          todoList={tl}
          deleteTodolist={deleteTodolist}
          tasks={filteredTasks}
          date={ruDate}
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          createTask={createTask}
          changeTaskStatus={changeTaskStatus}
          changeTaskTitle={changeTaskTitle}
          changeTodolistTitle={changeTodolistTitle}
        />
      })}
    </div>
  )
}


