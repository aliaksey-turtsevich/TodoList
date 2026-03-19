import { Button } from "./Button"
import { TodolistItemData } from "./types"
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

export const TodoListItem = ({ title, tasks, date, deleteTask, changeFilter, deleteAllTasks, createTask }: TodolistItemData) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [taskTitle, setTaskTitle] = useState('')

  const createTaskHandler = () => {
    createTask?.(taskTitle)
    setTaskTitle('')
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const createTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') createTaskHandler()
  }

  return (


    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnKeyHandler} />
        {/* <input ref={inputRef} /> */}
        <Button title={'+'} onClick={createTaskHandler} />
      </div>
      <ul>
        {tasks.length === 0 ?
          'You dont have tasks' :
          tasks.map(el => {
            const deleteTaskHandler = () => {
              deleteTask?.(el.id)
            }
            return (
              <li key={el.id}>
                <input type="checkbox" checked={el.isDone} />
                <span>{el.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} /></li>
            )
          })
        }
      </ul>
      <div>
        <Button title={'All'} onClick={() => changeFilter?.('all')} />
        <Button title={'Active'} onClick={() => changeFilter?.('active')} />
        <Button title={'Completed'} onClick={() => changeFilter?.('completed')} />
      </div>
      <Button title="Delete all tasks" onClick={() => deleteAllTasks?.()} />
      <div>{date}</div>
    </div>
  )
}