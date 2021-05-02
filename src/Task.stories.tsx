import React from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Task Component',
    component: Task
};

const changeTaskStatus = action(`Status changed`)
const changeTaskTitle = action(`Title changed`)
const removeTask = action(`Remove changed`)

export const TaskBaseExample = () => {
    return <div>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={'todolist1'}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={'todolist2'}
        />
    </div>;
};