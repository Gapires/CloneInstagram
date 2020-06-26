import React, { Component } from "react";
import { Text, View } from "react-native";

import api from "../../services/api";

export default class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    // this.registerToSocket();
    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  render() {
    return (
      <View>
        <Text>Feed</Text>
      </View>
    );
  }
}
