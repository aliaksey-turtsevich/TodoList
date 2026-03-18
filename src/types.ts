import { TodoFilterButton } from "./enum"

export type TodolistItemData = {
    title: string
    tasks: Task[]
    date?: string | undefined
    deleteTask?: (taskId: number) => void
    changeFilter?: (filter: TodoFilterButton) => void
    deleteAllTasks?: () => void
}

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type ButtonProps = {
    title: string
    onClick?: () => void
}