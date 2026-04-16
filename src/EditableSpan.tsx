import { useState } from "react"
import { EditableSpanProps } from "./types"

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
                (<input value={title} autoFocus onChange={changeTitleHandler} onBlur={turnOffEditMode} />)
                :
                (<span onDoubleClick={turnOnEditMode}>{value}</span>)}
        </>
    )
}