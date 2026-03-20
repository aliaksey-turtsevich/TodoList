export type TodolistItemData = {
    title: string
    filterValue: string
    tasks: Task[]
    date?: string | undefined
    deleteTask?: (taskId: string) => void
    changeFilter?: (filter: FilterValue) => void
    deleteAllTasks?: () => void
    createTask?: (title:string) => void
    changeTaskStatus?: (taskId: string, isDone: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type ButtonProps = {
    title: string
    onClick?: () => void
    className?: string
}

export type FilterValue = "all" | 'active' | 'completed'