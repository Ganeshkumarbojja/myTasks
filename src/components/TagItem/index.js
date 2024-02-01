import './index.css'

const TagItem = props => {
  const {tagDetails, isActive, onTag} = props
  const {displayText} = tagDetails
  const activeTag = isActive && 'active-tag-btn'
  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-btn ${activeTag}`}
        onClick={() => onTag(displayText)}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
