import React, { Component } from 'react'
import './ImageComments.css'

class ImageComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // An array to store comments
      editedCommentIndex: null, // Index of the comment being edited
      isDropdownOpen: false, // Dropdown menu state
      hoveredCommentIndex: null, // Index of the comment being hovered
    }
  }

  handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    const imageWidth = e.target.width
    const imageHeight = e.target.height

    // Calculate the position of the comment box
    const commentX = offsetX >= imageWidth / 2 ? offsetX - 220 : offsetX
    const commentY = offsetY >= imageHeight / 2 ? offsetY - 40 : offsetY

    const newComment = {
      x: commentX,
      y: commentY,
      text: 'Click to edit', // Default text
      editing: true, // Initially in edit mode
    }

    // Update the state with the new comment
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }))
  }

  handleCommentClick = (index) => {
    // Toggle the editing state of the clicked comment
    this.setState((prevState) => {
      const updatedComments = [...prevState.comments]
      updatedComments[index].editing = !updatedComments[index].editing
      return { comments: updatedComments, editedCommentIndex: index }
    })
  }

  handleCommentChange = (event, index) => {
    const { value } = event.target
    const { comments } = this.state

    // Update the text of the edited comment
    const updatedComments = [...comments]
    updatedComments[index].text = value

    this.setState({
      comments: updatedComments,
    })
  }

  handlePostComment = (index) => {
    // Reset the index of the comment being edited
    this.setState((prevState) => ({
      comments: prevState.comments.map((comment, i) => ({
        ...comment,
        editing: i === index ? false : comment.editing, // Only update the edited comment's editing state
      })),
      editedCommentIndex: null,
    }))

    // Update the comment with author and time
    this.setState((prevState) => {
      const updatedComments = [...prevState.comments]
      const editedComment = updatedComments[index]
      editedComment.author = 'Author' // Replace 'Author' with the actual author's name
      editedComment.time = new Date().toLocaleTimeString() // Add the current time

      return { comments: updatedComments }
    })
  }

  handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      // Prevent line break in the input field
      event.preventDefault()

      // Post the comment when Enter key is pressed
      this.handlePostComment(index)
    }
  }

  handleDeleteComment = (index) => {
    // Delete the comment at the specified index
    this.setState((prevState) => ({
      comments: prevState.comments.filter((_, i) => i !== index),
    }))
  }

  handleCopyLink = (index) => {
    // You can implement the logic to copy the comment link here.
    // For simplicity, I'll demonstrate copying the comment's index.
    const commentLink = `${window.location.href}#comment-${index + 1}`
    navigator.clipboard.writeText(commentLink)
    alert(`Comment link copied: ${commentLink}`)
  }

  toggleDropdown = (index) => {
    // Toggle the dropdown menu for the comment at the specified index
    this.setState((prevState) => ({
      comments: prevState.comments.map((comment, i) => ({
        ...comment,
        isDropdownOpen: i === index ? !comment.isDropdownOpen : false,
      })),
    }))
  }

  handleCommentMouseEnter = (index) => {

    this.setState({
      hoveredCommentIndex: index,
    })
  }

  // Handler for moving mouse away from a comment
  handleCommentMouseLeave = () => {
    this.setState({ hoveredCommentIndex: null })
  }

  render() {
    const {
      comments,
      editedCommentIndex,
      hoveredCommentIndex,
    } = this.state

    return (
      <div className="image-comments-container">
        <div className="image-container">
          <img
            src="Images\addcommentstothis.jpeg"
            alt="Your Image"
            onClick={this.handleImageClick}
          />
          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment-popup"
              style={{ left: comment.x, top: comment.y }}
            >
              {comment.editing ? (
                <>
                  <input
                    type="text"
                    value={comment.text}
                    onChange={(event) => this.handleCommentChange(event, index)}
                    onKeyPress={(event) => this.handleKeyPress(event, index)}
                  />
                  <button
                    onClick={() => this.handlePostComment(index)}
                    className="comment-popup-button"
                  >
                    Post
                  </button>
                </>
              ) : (
                <>
                  <span
                    className="comment-index"
                    onMouseEnter={() => this.handleCommentMouseEnter(index)}
                    onMouseLeave={this.handleCommentMouseLeave}
                  >
                    {index + 1}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar to display comments */}
        {/* Sidebar to display comments */}
        <div className="comment-sidebar">
          <h3>Comments</h3>
          <hr />
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <div className="comment-dropdown">
                  <button
                    className="dropdown-button"
                    onClick={() => this.toggleDropdown(index)}
                  >
                    <span className="dots">&#8230;</span>
                  </button>
                  {comment.isDropdownOpen && (
                    <div className="dropdown-content">
                      <button
                        onClick={() => this.handleCommentClick(index)}
                        className="comment-popup-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDeleteComment(index)}
                        className="comment-popup-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.handleCopyLink(index)}
                        className="comment-popup-button"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
                <span className="comment-index">{index + 1}</span>

                <div className="comment-content">
                  <strong>{comment.author}:</strong>
                  <br />
                  {comment.time}
                </div>
                <div className="comment-text">{comment.text}</div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
        {hoveredCommentIndex !== null && (
          <div
            className="comment-details-popup"
          >
            <div className="comment-content">
              <strong>{comments[hoveredCommentIndex].author}:</strong>
              <br />
              {comments[hoveredCommentIndex].time}
            </div>
            <div className="comment-text">
              {comments[hoveredCommentIndex].text}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ImageComments
