import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterType = `all` | `active` | `completed`

export function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterType>('all');

    function addTask(title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }
    function changeFilter(value: FilterType) {
        setFilter(value);
    }
    function changeStatus (taskID: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div className='App'>
            <Todolist heading={'What to learn'}
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}