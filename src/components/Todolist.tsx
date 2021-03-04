import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';

type TodolistPropsType = {
    heading: string
    tasks: Array<TasksType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onClickAddTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    };
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            onClickAddTask();
        }
    };
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
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
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onClickRemoveTask = () => {
                                props.removeTask(t.id);
                            };

                            return <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickRemoveTask}>x
                                </button>
                            </li>;
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={onClickChangeFilterAll}>All</button>
                <button onClick={onClickChangeFilterActive}>Active</button>
                <button onClick={onClickChangeFilterCompleted}>Completed</button>
            </div>
        </div>
    );
}

