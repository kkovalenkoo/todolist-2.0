import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React from 'react';

export default {
    title: 'AddItemFrom Component',
    component: AddItemForm
}

const callback = action(`Button 'add' was pressed inside the form`)

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}