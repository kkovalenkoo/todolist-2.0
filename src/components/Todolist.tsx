import React from 'react';
import {FilterType, TasksType} from '../App';

type TodolistPropsType = {
    heading: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {props.removeTask(t.id)}}>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter(`all`)}}>All</button>
                <button onClick={() => {props.changeFilter(`active`)}}>Active</button>
                <button onClick={() => {props.changeFilter(`completed`)}}>Completed</button>
            </div>
        </div>
    );
}

