import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import './Todo.css'
import Todotask from './Todotask.jsx'

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      todos: [],
      error: '',
      id: null,
      editedInputValue: '',
    }
  }
  handleChange = (value) => {
    this.setState({ inputValue: value })
  }
  handleSetNewTodo = () => {
    if (!this.state.inputValue.trim()) {
      return
    } else if (
      this.state.todos.filter((todo) => todo.name === this.state.inputValue)
        .length > 0
    ) {

      return
    }
    if (this.state.inputValue) {
      const task = {
        name: this.state.inputValue,
        isDone: false,
        checked: false,
        id: uuidv4(),
      }

      this.setState({
        todos: [...this.state.todos, task],
        inputValue: '',
        error: '',
      })
    }
  }

  editTodo = (id) => {
    this.setState({ editedInputValue: '', id: id })
  }
  handleEditInput = (value) => {
    this.setState({ editedInputValue: value })
  }
  saveEditedInput = (todo, index) => {
    if (!this.state.editedInputValue.trim()) {
      this.setState({ id: -1 })
      return
    }
    if (
      this.state.todos.filter(
        (todo, idx) =>
          todo.name === this.state.editedInputValue && idx !== index
      ).length > 0
    ) {

      return
    }
    todo.name = this.state.editedInputValue
    this.setState({ id: null, error: '' })
  }
  removeTodo = (id) => {
    let newTodos = this.state.todos.filter((elem) => elem.id !== id)
    this.setState({ todos: newTodos })
  }
  markChecked = (index) => {
    const someArr = [...this.state.todos]
    someArr[index].isDone = someArr[index].isDone ? false : true
    this.setState({ todos: someArr })
  }
  moveUp = (index) => {
    if (index === 0) {
    } else {
      let someArr = [...this.state.todos]
      let temp = someArr[index]
      someArr[index] = someArr[index - 1]
      someArr[index - 1] = temp
      this.setState({ todos: someArr, error: '' })
    }
  }
  moveDown = (index) => {
    let someArr = [...this.state.todos]
    if (index === someArr.length - 1) {
    } else {
      let temp = someArr[index]
      someArr[index] = someArr[index + 1]
      someArr[index + 1] = temp
      this.setState({ todos: someArr, error: '' })
    }
  }
  clearAll = () => {
    if (this.state.todos.length === 0) {
    }
    this.setState({ todos: [], error: '', inputValue: '' })
  }
  changeHandler = (index) => {
    const someArr = [...this.state.todos]
    someArr[index].checked = someArr[index].checked ? false : true
    this.setState({ todos: someArr })
  }

  clearDone = () => {
    let someArr = [...this.state.todos]
    someArr = someArr.filter((todo) => todo.isDone === true)
    if (someArr.length === 0) {
 
    }
    someArr = this.state.todos.filter((todo) => todo.isDone === false)

    this.setState({ todos: someArr, error: '' })
  }
  
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleSetNewTodo()
    }
  }
  render() {
    return (
      <section className='todo-list'>
        <div className='error'>
          <div>{this.state.error}</div>
        </div>
        <div className='input-container'>
          <div>
            <input
              className='todo-input'
              type='text'
              placeholder='შეიყვანე თასქი'
              value={this.state.inputValue}
              onKeyPress={(e) => this.handleKeyPress(e)}
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </div>
          <div>
            <button
              className='submit'
              type='button'
              onClick={() => this.handleSetNewTodo()}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className='todo'>
          <ul className='ulist'>
            {this.state.todos.map((todo, index) => (
              <Todotask
                key={todo.id}
                state={this.state}
                todo={todo}
                index={index}
                moveUp={this.moveUp}
                moveDown={this.moveDown}
                changeHandler={this.changeHandler}
                handleEditInput={this.handleEditInput}
                saveEditedInput={this.saveEditedInput}
                removeTodo={this.removeTodo}
                editTodo={this.editTodo}
                markChecked={this.markChecked}
              />
            ))}
          </ul>
        </div>
        <div className='clear-buttons'>
          <button
            className='clear-button'
            type='button'
            onClick={this.clearAll}
          >
            გასუფთავება
          </button>
          <button
            className='clear-button'
            type='button'
            onClick={this.clearChecked}
          >
            შემოწმება
          </button>
          <button
            className='clear-button'
            type='button'
            onClick={this.clearDone}
          >
            შესრულებულის წაშლა
          </button>
        </div>
      </section>
    )
  }
}

export default Todolist;
