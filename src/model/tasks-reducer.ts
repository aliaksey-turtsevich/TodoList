
import { v1 } from "uuid"
import { TasksState } from "../types"
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer"


const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'CREATE-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        case 'DELETE-TODOLIST': {
            const { id } = action.payload;
            const newState = { ...state };
            delete newState[id];
            return newState;
        }
        case 'REMOVE-TASK': {
            const { todoListId, taskId } = action.payload;
            return { ...state, [todoListId]: state[todoListId].filter(task => task.id !== taskId) }
        }
        case 'CREATE-TASK': {
            const { todoListId, title } = action.payload;
            const newTask = { id: action.payload.taskId, title, isDone: false };
            return { ...state, [todoListId]: [newTask, ...state[todoListId]] };
        }
        case 'CHANGE-TASK-STATUS': {
            const { todolistId, taskId, isDone } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? { ...task, isDone } : task
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            const { todolistId, taskId, title } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? { ...task, title } : task
                )
            }
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | RemoveTaskAction | DeleteTodolistAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: { todoListId, taskId }
    } as const
}
export type RemoveTaskAction = ReturnType<typeof removeTaskAC>

export const createTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'CREATE-TASK',
        payload: { todoListId, title, taskId: v1() }
    } as const
}
export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { todolistId, taskId, isDone }
    } as const
}
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', 
        payload: { todolistId, taskId, title }
    } as const
}   
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>