import { useState } from "react"
import { EditableSpanProps } from "./types"
import TextField from '@mui/material/TextField'

export const EditableSpan = ({ value, onChange }: EditableSpanProps) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }
    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <>
            {isEditMode
                ?
                (<TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={turnOffEditMode}
                    autoFocus />
                )
                :
                (<span onDoubleClick={turnOnEditMode}>{value}</span>)}
        </>
    )
}