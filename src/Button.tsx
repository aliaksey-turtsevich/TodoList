import { ButtonProps } from "./types"



export const Button = ({title, onClick, className}:ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}