import './App.css'
import { containerSx } from './TodolistItem.styles'
import { NavButton } from './NavButton'
import { CreateItemForm } from './CreateItemForm'
import { v1 } from 'uuid'
import { useState } from 'react'
import { TodoListItem } from './TodolistItem'
import { FilterValues, TasksState, TodoList } from './types'
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
              const todolistTasks = tasks[tl.id]
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
                    changeFilter={changeFilter}
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


