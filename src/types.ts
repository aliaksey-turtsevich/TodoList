export type TodolistItemData = {
    title: string
    tasks: Task[]
    date?: string | undefined
}

export type Task = {
    id: number
    title: string
    isDone: boolean
} 

export type ButtonProps = {
    title: string
}