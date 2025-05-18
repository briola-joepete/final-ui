import React, { useState } from 'react';
import type { Post } from '../types/Post';
import { deletePost, updatePost } from '../services/api';

interface PostProps {
  post: Post;
  onPostUpdated: (updatedPost: Post) => void;
  onPostDeleted: (postId: number) => void;
}

const PostComponent: React.FC<PostProps> = ({ post, onPostUpdated, onPostDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      onPostDeleted(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditSave = async () => {
    try {
      const updatedPost = await updatePost(post.id, { ...post, content: editedContent });
      onPostUpdated(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const getTimeLabel = (createdAt: string, updatedAt?: string) => {
    const now = Date.now();
    const createdTime = new Date(createdAt).getTime();
    const updatedTime = updatedAt ? new Date(updatedAt).getTime() : null;

    // If the post is newly created and not edited
    if (!updatedTime || createdTime === updatedTime) {
      const diffMinutes = Math.floor((now - createdTime) / 60000);
      return diffMinutes <= 5
        ? `Just created at: ${new Date(createdTime).toLocaleString()}`
        : `Created At: ${new Date(createdTime).toLocaleString()}`;
    }

    // If the post has been edited
    const diffMinutes = Math.floor((now - updatedTime) / 60000);
    return diffMinutes <= 5
      ? `Edited just now at: ${new Date(updatedTime).toLocaleString()}`
      : `Edited At: ${new Date(updatedTime).toLocaleString()}`;
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#fff',
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{post.author}</p>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '8px',
          }}
        />
      ) : (
        <p>{post.content}</p>
      )}
      {post.imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img
            src={post.imageUrl}
            alt="Post"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}
      <p
        style={{
          fontSize: '0.8em',
          color: '#666',
        }}
      >
        {getTimeLabel(post.createdAt, post.updatedAt)}
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {isEditing ? (
          <button
            onClick={handleEditSave}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#28a745',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#dc3545',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostComponent;