
export type TodolistItemData = {
    todoList: TodoList
    tasks: Task[]
    date?: string | undefined
    deleteTodolist: (todoListId: string) => void
    deleteTask?: (todoListId: string, taskId: string) => void
    changeFilter?: (todoListId: string, filter: FilterValues) => void
    createTask?: (todoListId: string, title: string) => void
    changeTaskStatus?: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
  [key: string]: Task[]
}

export type ButtonProps = {
    title: string
    onClick?: () => void
    className?: string
}

export type TodoList = {
    title: string
    id: string
    filter: FilterValues
}

export type FilterValues = "all" | 'active' | 'completed'

export type CreateItemFormProps = {
    onCreateItem: (title: string) => void
}

export type EditableSpanProps = {
  value: string
  onChange: (title: string) => void
}