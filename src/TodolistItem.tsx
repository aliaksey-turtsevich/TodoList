import { Button } from "./Button"
import { TodolistItemData } from "./types"
import { TodoFilterButton } from "./enum"


export const TodoListItem = ({ title, tasks, date, deleteTask, changeFilter, deleteAllTasks }: TodolistItemData) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.length === 0 ?
          'You dont have tasks' :
          tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone} /><span>{el.title}</span><Button title={"x"} onClick={() => deleteTask?.(el.id)} /></li>)
        }
      </ul>
      <div>
        <Button title={TodoFilterButton.ALL} onClick={() => changeFilter?.(TodoFilterButton.ALL)} />
        <Button title={TodoFilterButton.ACTIVE} onClick={() => changeFilter?.(TodoFilterButton.ACTIVE)} />
        <Button title={TodoFilterButton.COMPLETED} onClick={() => changeFilter?.(TodoFilterButton.COMPLETED)} />
      </div>
      <Button title="delete all tasks" onClick={() => deleteAllTasks?.()} />
      <div>{date}</div>
    </div>
  )
}