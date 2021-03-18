import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type FilterType = `all` | `active` | `completed`
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}]
    });

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]);

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]];
        setTasks({...tasks});
    }

    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeFilter(value: FilterType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        const task = tasks[todolistId].find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
        const task = tasks[todolistId].find(t => t.id === taskID);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }
    function changeTodolistTitle(id:string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    function addTodolist(title: string) {
        const newTodolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            [newTodolist.id]: [],
            ...tasks
        });
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {

                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    heading={tl.title}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={tl.filter}
                />;
            })}

        </div>
    );
}