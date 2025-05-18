import axios from 'axios';

const api = axios.create({
  baseURL: 'https://final-api-884y.onrender.com/api', // Replace with your backend URL if different
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (post: { content: string; imageUrl: string; author: string }) => {
  const response = await api.post('/posts', post);
  return response.data;
};

// Add PUT (updatePost) method
export const updatePost = async (id: number, updatedPost: Partial<{ content: string; imageUrl: string; author: string }>) => {
  const response = await api.put(`/posts/${id}`, updatedPost);
  return response.data;
};

// Add DELETE (deletePost) method
export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default api;