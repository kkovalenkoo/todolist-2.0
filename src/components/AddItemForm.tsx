import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    };
    const onClickAddTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required');
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle('');
    };


    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeTaskTitle}
                   onKeyPress={onKeyPressAddTask}
                   className={error ? 'error' : ''}
            />
            <button onClick={onClickAddTask}>+</button>
            <div className={error ? 'error-message' : ''}>{error}</div>
        </div>
    );
}