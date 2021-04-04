import {TasksStateType} from '../App';
import {TaskType} from '../Todolist';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType | ChangeTaskTitleActionType | addTodolistActionType | ReturnType<typeof removeTodolistAC>;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const findNeedTask = tasks.filter(t => t.id !== action.id);
            stateCopy[action.todolistId] = findNeedTask
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const task: TaskType = {id: v1(), title: action.title, isDone: false};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [task, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.id);
            if (task) {
                task.title = action.newTitle;
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error(`I don't understand this type`);
    }
};

export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId} as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const;
};
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const;
};
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const;
};
