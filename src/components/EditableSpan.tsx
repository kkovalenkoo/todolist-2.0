import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('')

    const activeEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode ?
            <input value={title} onChange={onChangeTitle} onBlur={activeViewMode} autoFocus/> :
            <span onDoubleClick={activeEditMode}>{props.title}</span>
    );
}