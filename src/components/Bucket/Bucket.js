import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import TodoItem from "../Todo/TodoItem";
import { FaTrash } from "react-icons/fa";

import { connect } from "react-redux";
import { editBucket, deleteBucket, addTodo } from "../../actions";

import "./Bucket.scss";

function Bucket(props) {
  const [titleEdit, titleEditHandle] = useState(false);
  const [title, onTitleChange] = useState(props.bucket.title);
  const [showTodoInput, showTodoInputHandle] = useState(false);

  const onBucketTitleEdit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.children[0].value;

    if (inputValue.length > 0) {
      titleEditHandle(false);
      props.editBucket(props.bucket.id, inputValue);
    }
  };

  const deleteBucket = () => {
    let wantToDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (wantToDelete) {
      props.deleteBucket(props.bucket.id);
    }
  };

  const addNewTodo = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.children[0].value;

    if (inputValue.length > 0) {
      props.addTodo(props.bucket.id, inputValue);

      //Hide todo input
      showTodoInputHandle(false);
    }
  };

  const renderTodos = () => {
    return props.bucket.todos.map(todo => {
      return <TodoItem key={todo.id} todo={todo} />;
    });
  };

  return (
    <div className="col-md-4">
      <Card className="mt-3">
        <Card.Body>
          {/* Bucket header */}
          <div className="d-flex justify-content-between">
            {!titleEdit && (
              <>
                <span
                  onClick={() => titleEditHandle(true)}
                  className="h2 card-title"
                >
                  {props.bucket.title}
                </span>
                <button
                  className="btn text-danger"
                  href="#"
                  onClick={() => deleteBucket()}
                >
                  <FaTrash />
                </button>
              </>
            )}
            {titleEdit && (
              <Form onSubmit={onBucketTitleEdit}>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => onTitleChange(e.target.value)}
                />
              </Form>
            )}
          </div>

          {/* Add new todo */}
          <button
            onClick={() => showTodoInputHandle(true)}
            className="btn btn-outline-primary btn-block mt-4"
          >
            Add new todo
          </button>

          {showTodoInput && (
            <Form className="mt-3" onSubmit={addNewTodo}>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Enter your todo here..."
              />
            </Form>
          )}

          <div className="todo-list mt-4">{renderTodos()}</div>

          {/* Show all todo added on this bucket */}
        </Card.Body>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    buckets: state.buckets
  };
};

export default connect(mapStateToProps, {
  editBucket,
  deleteBucket,
  addTodo
})(Bucket);
