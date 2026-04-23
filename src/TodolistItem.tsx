
import Button from '@mui/material/Button'
import { FilterValues, TodolistItemData } from "./types"
import { ChangeEvent } from 'react'
import './App.css'
import { CreateItemForm } from "./CreateItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { containerSx, getListItemSx } from './TodolistItem.styles'


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
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      <List>
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
              <ListItem key={el.id} sx={getListItemSx(el.isDone)}>
                <div>
                  <Checkbox checked={el.isDone} onChange={changeTaskCheckBoxHandler} />
                  <EditableSpan value={el.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={() => deleteTaskHandler(id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          })
        }
      </List>
      <Box sx={containerSx}>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterHandler('all')}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterHandler('active')}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterHandler('completed')}>
          Completed
        </Button>
      </Box>
      <div>{date}</div>
    </div>
  )
}