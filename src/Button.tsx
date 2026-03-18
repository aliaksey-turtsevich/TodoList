import { ButtonProps } from "./types"



export const Button = ({title, onClick}:ButtonProps) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}