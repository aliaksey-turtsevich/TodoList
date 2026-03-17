import { Button } from "./Button"
import { TodolistItemData } from "./types"
import { TodoFilterButton } from "./enum"


export const TodoListItem = ({title, tasks, date}:TodolistItemData) => {
    return (
        <>
          <h3>{title}</h3>
          <div>
            <input/>
            <button>+</button>
          </div>
          <ul>
            { tasks.length === 0 ? 
            'You dont have tasks' :
            tasks.map((el)=><li key={el.id}><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>)
            }
          </ul>
          <>
            <Button title={TodoFilterButton.ALL}/>
            <Button title={TodoFilterButton.ACTIVE}/>
            <Button title={TodoFilterButton.COMPLETED}/>
          </>
          <div>{date}</div>
        </>
    )
}