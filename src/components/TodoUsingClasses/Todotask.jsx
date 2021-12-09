import React, { Component } from 'react'
import { FaTrashAlt, FaCheck } from 'react-icons/fa'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { GiSaveArrow } from 'react-icons/gi'

class Todotask extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <li key={this.props.todo.id}>
        <div className='ctrl-btns'>
          <button
            className='btn'
            type='button'
            onClick={() => this.props.moveUp(this.props.index)}
          >
            <IoIosArrowUp />
          </button>
          <button
            className='btn'
            type='button'
            onClick={() => this.props.moveDown(this.props.index)}
          >
            <IoIosArrowDown />
          </button>
          <input
            type='checkbox'
            onChange={() => this.props.changeHandler(this.props.index)}
            checked={this.props.todo.checked}
          />
          {this.props.todo.id === this.props.state.id ? (
            <span className='edit-section'>
              <input
                className='edit-input'
                type='text'
                value={
                  this.props.state.editedInputValue === ''
                    ? this.props.todo.name
                    : this.props.state.editedInputValue
                }
                onChange={(e) => this.props.handleEditInput(e.target.value)}
              />
              <button
                className='btn'
                type='button'
                onClick={() =>
                  this.props.saveEditedInput(this.props.todo, this.props.index)
                }
              >
                <GiSaveArrow />
              </button>
            </span>
          ) : (
            <span
              className={`todo-text ${this.props.todo.isDone ? 'checked' : ''}`}
            >
              {this.props.todo.name}
            </span>
          )}
        </div>
        <div className='ctrl-buttons'>
          <button
            className='btn'
            type='button'
            onClick={() => this.props.removeTodo(this.props.todo.id)}
          >
            <FaTrashAlt />
          </button>
          <button
            className='btn'
            type='button'
            onClick={() => this.props.editTodo(this.props.todo.id)}
          >
            <MdEdit />
          </button>
          <button
            className='btn'
            type='button'
            onClick={() => this.props.markChecked(this.props.index)}
          >
            <FaCheck />
          </button>
        </div>
      </li>
    )
  }
}

export default Todotask;
