import { Button } from "./Button"
import { FilterValues, TodolistItemData } from "./types"
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { CreateItemForm } from "./CreateItemForm"
import { EditableSpan } from "./EditableSpan"

export const TodoListItem = ({
  todoList: { title, filter, id },
  tasks,
  date,
  deleteTask,
  deleteTodolist,
  changeFilter,
  createTask,
  changeTaskStatus,
  changeTodolistTitle,
  changeTaskTitle,
}: TodolistItemData) => {

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter?.(id, filter)
  }

  const createTaskHandler = (title: string) => {
    createTask?.(id, title)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (

    <div>
      <div className={'container'}>
        {/* <h3>{title}</h3> */}
        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
        <Button title={'x'} onClick={deleteTodolistHandler} />
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
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
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, el.id, title)
            }
            return (
              <li key={el.id} className={el.isDone === true ? 'is-done' : ''}>
                <input type="checkbox" checked={el.isDone} onChange={changeTaskCheckBoxHandler} />
                <EditableSpan value={el.title} onChange={changeTaskTitleHandler} />
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