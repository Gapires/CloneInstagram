import React, { Component } from "react";
import io from "socket.io-client";
import api from "../../services/api";

import "./Feed.css";

import more from "../../assets/svgs/more.svg";
import like from "../../assets/svgs/like.svg";
import comment from "../../assets/svgs/comment.svg";
import send from "../../assets/svgs/send.svg";

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("posts");
    this.setState({ feed: response.data });
  }

  handleLike = (id) => {
    api.post(`posts/${id}/like`);
  };

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    socket.on("post", (newPost) => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", (likedPost) => {
      this.setState({
        feed: this.state.feed.map((post) => (post._id === likedPost._id ? likedPost : post)),
      });
    });
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map((post) => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} alt="Mais"></img>
            </header>

            <img src={`http://localhost:3333/files/${post.image}`} alt=""></img>

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt=""></img>
                </button>
                <img src={comment} alt=""></img>
                <img src={send} alt=""></img>
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
