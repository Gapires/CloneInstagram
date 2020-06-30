import React, { Component, useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";

import io from "socket.io-client";

import styles from "./styles";

import api from "../../services/api";

import more from "../../../assets/more.png";
import like from "../../../assets/like.png";
import comment from "../../../assets/comment.png";
import send from "../../../assets/send.png";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // registerToSocket()
    async function fetchDataPosts() {
      const response = await api.get("posts");
      setFeed(response.data);
    }

    fetchDataPosts();
  }, []);

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  // function registerToSocket() {
  //   const socket = io("http://10.0.2.2:3333");

  //   socket.on("post", (newPost) => {
  //     setFeed(feed.unshift(newPost));
  //   });

  //   socket.on("like", (likedPost) => {
  //     setFeed(feed.map((post) => (post._id === likedPost._id ? likedPost : post)));
  //   });
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => (
          <View key={item._id} style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>
              <Image source={more}></Image>
            </View>

            <Image style={styles.feedImage} source={{ uri: `http://10.0.2.2:3333/files/${item.image}` }}></Image>

            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={() => handleLike(item._id)}>
                  <Image source={like}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={comment}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={send}></Image>
                </TouchableOpacity>
              </View>

              <Text style={styles.likes}>{item.likes} curtidas</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
