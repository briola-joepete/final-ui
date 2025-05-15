import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import type { Post } from '../types/Post';
import PostComponent from '../components/Post';
import PostForm from '../components/PostForm';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        // Sort posts by creation date (latest first)
        const sortedPosts = data.sort(
          (a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    loadPosts();
  }, []);

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f2f2f2',
      }}
    >
      {/* Header Section */}
      <header
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          position: 'sticky',
          top: 0,
          boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>Friendster Newsfeed</h1>
      </header>

      {/* Main Layout Section */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          maxWidth: '1200px',
          margin: '20px auto',
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Sidebar Section */}
        <aside
          style={{
            flex: '0 0 300px',
            backgroundColor: '#f9f9f9',
            borderRight: '1px solid #ddd',
            padding: '20px',
          }}
        >
          {/* Profile Picture */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQGN7ka5rSLISg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683551985901?e=2147483647&v=beta&t=ThzuG_ZGV93_rN2o8KBEy5PSsMV1KG9dXp3WTW2HDnU"
              alt="Profile"
              style={{
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                marginBottom: '10px',
              }}
            />
            <h2 style={{ margin: '0', fontSize: '1.5em', color: '#36454F'}}>Joe Pete</h2>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul
              style={{
                listStyleType: 'none',
                padding: '0',
                margin: '0',
                textAlign: 'center',
              }}
            >
              <li style={{ margin: '10px 0' }}>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#0073e6',
                    fontWeight: 'bold',
                  }}
                >
                  Home
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#0073e6',
                    fontWeight: 'bold',
                  }}
                >
                  About
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#0073e6',
                    fontWeight: 'bold',
                  }}
                >
                  Friends
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#0073e6',
                    fontWeight: 'bold',
                  }}
                >
                  Photos
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Section */}
        <main
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#36454F', fontWeight: 'bold', marginBottom: '0px',}}>Posts</h2>
          <PostForm onNewPost={handleNewPost} />
          <div style={{ marginTop: 'auto', width: '800px' }}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostComponent
                  key={post.id}
                  post={post}
                  onPostUpdated={handlePostUpdated}
                  onPostDeleted={handlePostDeleted}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>
                No posts available!
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <p>&copy; 2025 Friendster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;