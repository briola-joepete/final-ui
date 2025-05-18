import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import type { Post } from '../types/Post';
import PostComponent from '../components/Post';
import PostForm from '../components/PostForm';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth < 600;
  const isTablet = windowWidth >= 600 && windowWidth < 900;
  const isDesktop = windowWidth >= 900;

  const sidebarWidth = isMobile ? '100%' : isTablet ? '35%' : '22%';
  const mainWidth = isMobile ? '100%' : isTablet ? '65%' : '78%';
  const layoutDirection = isMobile ? 'column' : 'row';

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  // Sidebar component for re-use
  const Sidebar = (
    <aside
      style={{
        width: sidebarWidth,
        minWidth: 0,
        backgroundColor: '#f9f9f9',
        borderRight: isMobile ? 'none' : '1px solid #ddd',
        borderBottom: isMobile ? '1px solid #eee' : 'none',
        padding: isMobile ? '16px 8px' : '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Profile Picture */}
      <div style={{ marginBottom: isMobile ? '8px' : '20px' }}>
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQGN7ka5rSLISg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683551985901?e=2147483647&v=beta&t=ThzuG_ZGV93_rN2o8KBEy5PSsMV1KG9dXp3WTW2HDnU"
          alt="Profile"
          style={{
            borderRadius: '50%',
            width: isMobile ? '90px' : '150px',
            height: isMobile ? '90px' : '150px',
            marginBottom: isMobile ? '6px' : '10px',
          }}
        />
        <h2 style={{ margin: '0', fontSize: isMobile ? '1.1em' : '1.5em' }}>Joe Pete</h2>
      </div>
      {/* Navigation Menu or Burger */}
      {isMobile ? (
        <div style={{ marginBottom: '10px', position: 'relative' }}>
          <button
            aria-label="Toggle navigation"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              zIndex: 20,
            }}
            onClick={() => setNavOpen((open) => !open)}
          >
            {/* Burger icon */}
            <div style={{ width: 28, height: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    height: 4,
                    width: '28px',
                    background: '#0073e6',
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    transform:
                      navOpen
                        ? i === 0
                          ? 'translateY(10px) rotate(45deg)'
                          : i === 1
                          ? 'scaleX(0)'
                          : i === 2
                          ? 'translateY(-10px) rotate(-45deg)'
                          : ''
                        : 'none',
                  }}
                />
              ))}
            </div>
          </button>
          {navOpen && (
            <nav
              style={{
                background: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.11)',
                borderRadius: 8,
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80vw',
                maxWidth: 320,
                zIndex: 10,
              }}
            >
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {['Home', 'About', 'Friends', 'Photos'].map((item) => (
                  <li key={item} style={{
                    margin: 0,
                    padding: '14px 0',
                    borderBottom: '1px solid #eee',
                  }}>
                    <a
                      href="#"
                      style={{
                        textDecoration: 'none',
                        color: '#0073e6',
                        fontWeight: 'bold',
                        fontSize: '1em',
                        display: 'block',
                      }}
                      onClick={() => setNavOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      ) : (
        <nav>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              textAlign: 'center',
            }}
          >
            {['Home', 'About', 'Friends', 'Photos'].map((item) => (
              <li key={item} style={{ margin: '10px 0' }}>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#0073e6',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f2f2f2',
        boxSizing: 'border-box',
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          padding: isMobile ? '12px' : '20px',
          textAlign: 'center',
          minHeight: isMobile ? '46px' : '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          position: 'sticky',
          top: 0,
          boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: isMobile ? '1.25rem' : '2rem', margin: 0 }}>Friendster Newsfeed</h1>
      </header>

      {/* Main Layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: layoutDirection as 'row' | 'column',
          flex: 1,
          width: '100%',
          maxWidth: isDesktop ? '1200px' : '100vw',
          margin: isMobile ? '6px 0' : '20px auto',
          backgroundColor: '#fff',
          borderRadius: isMobile ? '0' : '8px',
          overflow: isMobile ? 'visible' : 'hidden',
          boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* For mobile: sidebar at the top, then main. For desktop/tablet: sidebar left, main right */}
        {isMobile ? (
          <>
            {Sidebar}
            <main
              style={{
                width: mainWidth,
                minWidth: 0,
                padding: '12px 4vw',
                boxSizing: 'border-box',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2 style={{ textAlign: 'center', fontSize: '1.1rem' }}>Posts</h2>
              <PostForm onNewPost={handleNewPost} />
              <div style={{ marginTop: '20px', width: '100%', maxWidth: '100%' }}>
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
          </>
        ) : (
          <>
            {Sidebar}
            <main
              style={{
                width: mainWidth,
                minWidth: 0,
                padding: '20px',
                boxSizing: 'border-box',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2 style={{ textAlign: 'center', fontSize: isTablet ? '1.2rem' : '1.5rem' }}>Posts</h2>
              <PostForm onNewPost={handleNewPost} />
              <div
                style={{
                  marginTop: '20px',
                  width: isTablet ? '95%' : '800px',
                  maxWidth: '100%',
                }}
              >
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
          </>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          textAlign: 'center',
          padding: isMobile ? '6px' : '10px',
          fontSize: isMobile ? '0.95em' : '1em',
        }}
      >
        <p style={{ margin: 0 }}>&copy; 2025 Friendster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;