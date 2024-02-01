import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskName, tagName} = taskDetails
  return (
    <li className="task-item">
      <p className="task-name">{taskName}</p>
      <button type="button" className="task-tag-btn">
        {tagName}
      </button>
    </li>
  )
}

export default TaskItem
