import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterType = `all` | `active` | `completed`

export function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterType>('all');

    function removeTask(id: number) {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }
    function changeFilter(value: FilterType) {
        setFilter(value);
    }


    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div>
            <Todolist heading={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}