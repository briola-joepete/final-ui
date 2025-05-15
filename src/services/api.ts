import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend URL if different
  headers: {
    'Content-Type': 'application/json', // Ensure JSON requests
  },
});

// GET: Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw the error for further handling
  }
};

// POST: Create a single post
export const createPost = async (post: { content: string; imageUrl: string; author: string }) => {
  try {
    const response = await api.post('/posts', post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// PUT: Update a single post by ID
export const updatePost = async (id: number, updatedPost: Partial<{ content: string; imageUrl: string; author: string }>) => {
  try {
    const response = await api.put(`/posts/${id}`, updatedPost);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// DELETE: Delete a single post by ID
export const deletePost = async (id: number) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

// POST: Bulk create posts
export const createPostsBulk = async (posts: Array<{ content: string; imageUrl: string; author: string }>) => {
  try {
    // Validate the payload is an array
    if (!Array.isArray(posts)) {
      throw new Error('Invalid payload: "posts" must be an array of objects.');
    }

    const response = await api.post('/posts/bulk', posts);
    return response.data;
  } catch (error) {
    console.error('Error creating posts in bulk:', error);
    throw error;
  }
};

export default api;