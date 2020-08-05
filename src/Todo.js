import React from 'react'
import style from './todo.module.scss'

const Todo = ({todoObj}) => {
    return (
        <div>
            {todoObj.text}
        </div>
    )
}

export default Todo;