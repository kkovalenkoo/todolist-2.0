import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';

type TodolistPropsType = {
    heading: string
    tasks: Array<TasksType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterType
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onClickAddTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required');
        }
        props.addTask(newTaskTitle.trim());
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

    const onClickChangeFilterAll = () => {
        props.changeFilter(`all`);
    };
    const onClickChangeFilterActive = () => {
        props.changeFilter(`active`);
    };
    const onClickChangeFilterCompleted = () => {
        props.changeFilter(`completed`);
    };

    return (
        <div>
            <h3>{props.heading}</h3>
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
                                props.removeTask(t.id);
                            };
                            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked);
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

