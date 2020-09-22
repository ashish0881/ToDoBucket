import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { editTodo, deleteTodo, completeTodo } from "../../actions";
import { FaPen, FaTrash } from "react-icons/fa";

import "./TodoItem.scss";

function TodoItem(props) {
  const [title, onTitleChange] = useState(props.todo.title);
  const [todoEdit, todoEditHandle] = useState(false);
  const [taskCompleted, taskCompletedHandle] = useState(props.todo.completed);

  const handleEditSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.children[0].value;

    if (inputValue.length > 0) {
      props.editTodo(props.todo.bucketId, props.todo.id, inputValue);
      todoEditHandle(false);
    }
  };

  const deleteTodo = () => {
    props.deleteTodo(props.todo.bucketId, props.todo.id);
  };

  const handleItemCheck = e => {
    props.completeTodo(props.todo.bucketId, props.todo.id, e.target.checked);
    taskCompletedHandle(e.target.checked);
  };

  const renderTodo = () => {
    const todoTitleClass = taskCompleted
      ? "h6 todo-title completed"
      : "h6 todo-title";

    return (
      <div className="todo-item my-2">
        {!todoEdit && (
          <>
            <Form.Check
              custom
              label=""
              className="todo-item-checkbox"
              type="checkbox"
              id={props.todo.id}
              onChange={handleItemCheck}
              checked={taskCompleted}
            />
            <div className="todo-title-wrapper">
              <label htmlFor={props.todo.id} className={todoTitleClass}>
                {props.todo.title}
              </label>

              <div>
                <button
                  className="todo-action-btn text-primary"
                  href="#"
                  onClick={() => todoEditHandle(true)}
                >
                  <FaPen className="icon-small" />
                </button>
                <button
                  className="todo-action-btn text-danger"
                  href="#"
                  onClick={() => deleteTodo()}
                >
                  <FaTrash className="icon-small" />
                </button>
              </div>
            </div>
          </>
        )}
        {todoEdit && (
          <Form className="w-100 my-2" onSubmit={handleEditSubmit}>
            <Form.Control
              type="text"
              autoFocus
              value={title}
              onChange={e => onTitleChange(e.target.value)}
              onBlur={() => todoEditHandle(false)}
            />
          </Form>
        )}
      </div>
    );
  };

  return <>{renderTodo()}</>;
}

export default connect(null, {
  editTodo,
  deleteTodo,
  completeTodo
})(TodoItem);
