import React, { Component } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

class DisplayPosts extends Component {
  // lifecycle to get the posts
  componentDidMount = async () => {
    this.getPosts();
  };

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts));
    // probing in and getting wha you want
    console.log("All Posts", JSON.stringify(result.data.listPosts.items));
  };
  render() {
    return <div>Hello World</div>;
  }
}

export default DisplayPosts;
