import React from "react";
import Form from "react-bootstrap/Form";
import uuid from "uuid";

import { connect } from "react-redux";
import { createBucket } from "../../actions";

class CreateBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateBucketInput: false,
      validated: false
    };
  }

  showCreateBucketBox = () => {
    this.setState({
      showCreateBucketInput: !this.state.showCreateBucketInput
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.children[0].value;
    console.log(this.props);

    if (inputValue.length > 0) {
      const id = uuid();
      // const title =;

      this.props.createBucket(id, inputValue);

      // Reset form
      form.reset();

      // Show Create button
      this.showCreateBucketBox();
    }
  };

  renderCreateBucketBox() {
    const { showCreateBucketInput } = this.state;
    if (showCreateBucketInput) {
      return (
        <div className="col-md-4 p-0">
          <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Control
              required
              type="text"
              placeholder="Enter Bucket Name"
              autoFocus
            />
          </Form>
        </div>
      );
    } else {
      return (
        <button onClick={this.showCreateBucketBox} className="btn btn-primary">
          Create New Bucket
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderCreateBucketBox()}</div>;
  }
}

export default connect(null, {
  createBucket
})(CreateBucket);
