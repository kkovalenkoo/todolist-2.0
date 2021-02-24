import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export function App() {

    const tasks: Array<TasksType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 1, title: 'React', isDone: false}
    ];

    return (
        <div className="App">
            <Todolist heading={'What to learn'}
                      tasks={tasks}
            />
        </div>
    );
}