import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';

type TodolistPropsType = {
    id: string
    heading: string
    tasks: Array<TasksType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterType
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onClickAddTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required');
        }
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle('');
    };
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    };
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        setError(null);
    };
    const onRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onClickChangeFilterAll = () => {
        props.changeFilter(`all`, props.id);
    };
    const onClickChangeFilterActive = () => {
        props.changeFilter(`active`, props.id);
    };
    const onClickChangeFilterCompleted = () => {
        props.changeFilter(`completed`, props.id);
    };

    return (
        <div>
            <h3>
                {props.heading}
                <button onClick={onRemoveTodolist}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeTaskTitle}
                       onKeyPress={onKeyPressAddTask}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                <div className={error ? 'error-message' : ''}>{error}</div>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onClickRemoveTask = () => {
                                props.removeTask(t.id, props.id);
                            };
                            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id);
                            };

                            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onChangeTaskStatus} checked={t.isDone}/>
                                <span>{t.title}</span>
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

