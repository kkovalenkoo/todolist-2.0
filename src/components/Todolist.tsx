import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    id: string
    heading: string
    tasks: Array<TasksType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterType
}

export function Todolist(props: TodolistPropsType) {

    const onRemoveTodolist = () => {
        props.removeTodolist(props.id);
    };
    const onChangeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };
    const onClickChangeFilterAll = () => {
        props.changeFilter(`all`, props.id);
    };
    const onClickChangeFilterActive = () => {
        props.changeFilter(`active`, props.id);
    };
    const onClickChangeFilterCompleted = () => {
        props.changeFilter(`completed`, props.id);
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.heading} onChange={onChangeTodolistTitle}/>
                <button onClick={onRemoveTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                            const onClickRemoveTask = () => {
                                props.removeTask(t.id, props.id);
                            };
                            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id);
                            };
                            const onChangeTaskTitle = (newTitle: string) => {
                                props.changeTaskTitle(t.id, newTitle, props.id);
                            };

                            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onChangeTaskStatus} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                                <button onClick={onClickRemoveTask}>x
                                </button>
                            </li>;
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickChangeFilterAll}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickChangeFilterActive}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickChangeFilterCompleted}>Completed
                </button>
            </div>
        </div>
    );
}

