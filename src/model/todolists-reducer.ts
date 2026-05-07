
import { v1 } from "uuid"
import { TodoList, FilterValues } from "../types"

const initialState: TodoList[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export const todolistsReducer = (state: TodoList[] = initialState, action: Actions): TodoList[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'CREATE-TODOLIST': {
            const newTodolist: TodoList = { id: action.payload.id, title: action.payload.title, filter: 'all' }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)
        }

        default: {
            return state
        }
    }
}

export const createTodolistAC = (title: string, id: string) => {
    return { type: 'CREATE-TODOLIST', payload: { title, id } } as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const deleteTodolistAC = (id: string) => {
    return { type: 'DELETE-TODOLIST', payload: { id } } as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload } as const
}
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload } as const
}
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>