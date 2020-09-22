import React from "react";
import CreateBucket from "../Bucket/CreateBucket";
import Bucket from "../Bucket/Bucket";

import { connect } from "react-redux";
import { createBucket } from "../../actions";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderBuckets() {
    let { buckets } = this.props.buckets;

    if (buckets.length) {
      return buckets.map(bucket => {
        return <Bucket bucket={bucket} key={bucket.id} />;
      });
    }
  }

  render() {
    return (
      <div className="mt-5">
        <CreateBucket addBucket={this.addBucket} />

        <div className="row">{this.renderBuckets()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buckets: state
  };
};

export default connect(mapStateToProps, {
  createBucket
})(Todo);
