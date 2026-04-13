import { Button } from "./Button"
import { FilterValues, TodolistItemData } from "./types"
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './App.css'

export const TodoListItem = ({
  todoList: { title, filter, id },
  tasks,
  date,
  deleteTask,
  deleteTodolist,
  changeFilter,
  createTask,
  changeTaskStatus,
}: TodolistItemData) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter?.(id, filter)
  }

  const createTaskHandler = () => {
    const trimTitle = taskTitle.trim()
    if (trimTitle !== '') {
      createTask?.(id, trimTitle)
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

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (

    <div>
      <div className={'container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={deleteTodolistHandler} />
      </div>
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
            const deleteTaskHandler = (id: string) => {
              deleteTask?.(id, el.id)
            }
            const changeTaskCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus?.(id, el.id, newStatusValue)
            }
            return (
              <li key={el.id} className={el.isDone === true ? 'is-done' : ''}>
                <input type="checkbox" checked={el.isDone} onChange={changeTaskCheckBoxHandler} />
                <span>{el.title}</span>
                <Button title={"x"} onClick={() => deleteTaskHandler(id)} /></li>
            )
          })
        }
      </ul>
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilterHandler('all')} />
        <Button className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilterHandler('active')} />
        <Button className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilterHandler('completed')} />
      </div>
      <div>{date}</div>
    </div>
  )
}