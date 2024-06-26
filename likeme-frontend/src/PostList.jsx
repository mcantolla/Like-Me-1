import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostUpdated = (id, newLikes) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: newLikes } : post));
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
};

export default PostList;
