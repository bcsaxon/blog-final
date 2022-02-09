import React, { Component } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

class DisplayPosts extends Component {
  // every react component lifecycle to get the posts
  //  in every app you need to control state
  state = {
    posts: [],
  };
  componentDidMount = async () => {
    this.getPosts();
  };

  getPosts = async () => {
    // API allows us to fetch and invoke add post, create post, etc. API has a lot of methods, we're using the graphql method
    // API returns a promise so you need to pass graphqlOperation to handle the promise
    // listPosts query to get all data
    const result = await API.graphql(graphqlOperation(listPosts));
    // digging in and getting what you want in the console log. result then one level deeper to data, to listPosts, to items.
    // need to connect a state of project, to have a spot to store the data coming in because when that data changes
    // that will need to be reflected in the app
    this.setState({ posts: result.data.listPosts.items });
    console.log("All Posts", result.data.listPosts.items);
  };
  render() {
    const { posts } = this.state;

    return posts.map((post) => {
      return (
        <div className="posts" style={rowStyle} key={post.id}>
          <h1>{post.postTitle}</h1>
          <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
            {"Wrote by: "}
            {post.postOwnerUsername}
            <time style={{ fontStyle: "italic" }}>
              {""}
              {new Date(post.createdAt).toDateString()}
            </time>
          </span>
          <p>{post.postBody}</p>
          <br></br>
          <span>
            <DeletePost />
            <EditPost />
          </span>
        </div>
      );
    });
  }
}
const rowStyle = {
  background: "#f4f4f4",
  padding: "10px",
  border: "1px #ccc dotted",
  margin: "14px",
};
export default DisplayPosts;
