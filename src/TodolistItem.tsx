import { Button } from "./Button"
import { TodolistItemData } from "./types"
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './App.css'

export const TodoListItem = ({ title, tasks, date, deleteTask, changeFilter, deleteAllTasks, createTask, changeTaskStatus, filterValue }: TodolistItemData) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    const trimTitle = taskTitle.trim()
    if (trimTitle !== '') {
      createTask?.(trimTitle)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    setError(null)
  }

  const createTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') createTaskHandler()
  }

  return (

    <div>
      <h3>{title}</h3>
      <div>
        <input className={error ? 'error' : ''} value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnKeyHandler} />
        {/* <input ref={inputRef} /> */}
        <Button title={'+'} onClick={createTaskHandler} />
        {error && <div className={'error-massage'}>{error}</div>}
      </div>
      <ul>
        {tasks.length === 0 ?
          'You dont have tasks' :
          tasks.map(el => {
            const deleteTaskHandler = () => {
              deleteTask?.(el.id)
            }
            const changeTaskCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus?.(el.id, newStatusValue)
            }
            return (
              <li key={el.id} className={el.isDone === true ? 'is-done' : ''}>
                <input type="checkbox" checked={el.isDone} onChange={changeTaskCheckBoxHandler} />
                <span>{el.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} /></li>
            )
          })
        }
      </ul>
      <div>
        <Button className={filterValue === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter?.('all')} />
        <Button className={filterValue === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilter?.('active')} />
        <Button className={filterValue === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilter?.('completed')} />
      </div>
      <Button title="Delete all tasks" onClick={() => deleteAllTasks?.()} />
      <div>{date}</div>
    </div>
  )
}