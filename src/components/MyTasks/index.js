import {Component} from 'react'
import {v4} from 'uuid'

import TaskItem from '../TaskItem'
import TagItem from '../TagItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasks: [],
    taskInput: '',
    tagInput: tagsList[0].optionId,
    activeTask: '',
  }

  onTaskInput = e => {
    this.setState({taskInput: e.target.value})
  }

  onTagInput = e => {
    this.setState({tagInput: e.target.value})
  }

  onAddTask = e => {
    const {taskInput, tagInput} = this.state
    const tagObj = tagsList.find(item => item.optionId === tagInput)
    const tagName = tagObj.displayText
    e.preventDefault()
    const newTask = {
      id: v4(),
      taskName: taskInput,
      tagName,
    }
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      taskInput: '',
      tagInput: tagsList[0].optionId,
    }))
  }

  renderTaskField = () => {
    const {taskInput} = this.state
    return (
      <div className="input-container">
        <label htmlFor="task" className="input-label">
          Task
        </label>
        <input
          type="text"
          className="input-style"
          placeholder="Enter the task here"
          id="task"
          value={taskInput}
          onChange={this.onTaskInput}
        />
      </div>
    )
  }

  renderTagsField = () => {
    const {tagInput} = this.state
    return (
      <div className="input-container">
        <label htmlFor="tags" className="input-label">
          Tags
        </label>
        <select
          className="input-style"
          id="tags"
          onChange={this.onTagInput}
          value={tagInput}
        >
          {tagsList.map(item => (
            <option key={item.optionId} value={item.optionId}>
              {item.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderInputCard = () => (
    <div className="input-card">
      <h1 className="input-head">Create a task!</h1>
      <form className="create-tasks" onSubmit={this.onAddTask}>
        {this.renderTaskField()}
        {this.renderTagsField()}
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  )

  renderTasks = () => {
    const {tasks, activeTask} = this.state
    let fileteredTasks
    if (activeTask === '') {
      fileteredTasks = tasks
    } else {
      fileteredTasks = tasks.filter(item => item.tagName === activeTask)
    }
    return (
      <ul className="tasks-list">
        {fileteredTasks.map(item => (
          <TaskItem key={item.id} taskDetails={item} />
        ))}
      </ul>
    )
  }

  onTag = tagName => {
    const {activeTask} = this.state
    if (activeTask === tagName) {
      this.setState({activeTask: ''})
    } else {
      this.setState({activeTask: tagName})
    }
  }

  render() {
    const {tasks, activeTask} = this.state
    return (
      <div className="app-container">
        {this.renderInputCard()}
        <div className="output-card">
          <h1 className="tags-head">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(item => (
              <TagItem
                key={item.optionId}
                tagDetails={item}
                isActive={item.displayText === activeTask}
                onTag={this.onTag}
              />
            ))}
          </ul>
          <h1 className="tasks-head">Tasks</h1>
          <div className="tasks-list-output">
            {tasks.length === 0 ? (
              <p className="no-tasks">No Tasks Added Yet</p>
            ) : (
              this.renderTasks()
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
