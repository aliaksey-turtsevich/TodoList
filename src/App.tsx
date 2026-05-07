import './App.css'
import { containerSx } from './TodolistItem.styles'
import { NavButton } from './NavButton'
import { CreateItemForm } from './CreateItemForm'
import { v1 } from 'uuid'
import { useReducer, useState } from 'react'
import { TodoListItem } from './TodolistItem'
import { FilterValues } from './types'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from './model/todolists-reducer'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, removeTaskAC, tasksReducer } from './model/tasks-reducer'


type ThemeMode = 'dark' | 'light'

export const App = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const date: Date = new Date()
  const ruDate: string = date.toLocaleDateString('ru-RU')

  const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [])
  const [tasksR, dispatchToTasks] = useReducer(tasksReducer, {})
 
  const createTask = (todoListId: string, title: string) => {
    dispatchToTasks(createTaskAC(todoListId, title))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
  }

  const deleteTask = (todoListId: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(todoListId, taskId))
  }

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title, v1())
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }))
  }

  const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }))
  }

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className="app">
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch
                  onChange={changeMode}
                  color="default"
                />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todoLists.map(tl => {
              const todolistTasks = tasksR[tl.id]
              let filteredTasks = todolistTasks
              if (tl.filter === 'completed') {
                filteredTasks = todolistTasks.filter(el => el.isDone)
              }
              if (tl.filter === 'active') {
                filteredTasks = todolistTasks.filter(el => !el.isDone)
              }
              return <Grid key={tl.id}>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
                  <TodoListItem
                    key={tl.id}
                    todoList={tl}
                    deleteTodolist={deleteTodolist}
                    tasks={filteredTasks}
                    date={ruDate}
                    deleteTask={deleteTask}
                    changeFilter={changeTodolistFilter}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
}


