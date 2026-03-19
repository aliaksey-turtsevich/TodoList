export type TodolistItemData = {
    title: string
    tasks: Task[]
    date?: string | undefined
    deleteTask?: (taskId: string) => void
    changeFilter?: (filter: FilterValue) => void
    deleteAllTasks?: () => void
    createTask?: (title:string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type ButtonProps = {
    title: string
    onClick?: () => void
}

export type FilterValue = "all" | 'active' | 'completed'