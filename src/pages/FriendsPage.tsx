import React from 'react';

const FriendsPage: React.FC = () => {
  const friends = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Ross' },
    { id: 5, name: 'Ethan Hunt' },
  ];

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
      <header
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          padding: '20px 10px',
          textAlign: 'center',
        }}
      >
        <h1>Friends Page</h1>
      </header>

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
        <aside
          style={{
            flex: '0 0 300px',
            backgroundColor: '#f9f9f9',
            borderRight: '1px solid #ddd',
            padding: '20px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              style={{
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                marginBottom: '10px',
              }}
            />
            <h2 style={{ margin: '0', fontSize: '1.5em' }}>Your Name</h2>
          </div>

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
                <a href="/" style={{ textDecoration: 'none', color: '#0073e6', fontWeight: 'bold' }}>
                  Home
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="/about" style={{ textDecoration: 'none', color: '#0073e6', fontWeight: 'bold' }}>
                  About
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="/friends" style={{ textDecoration: 'none', color: '#0073e6', fontWeight: 'bold' }}>
                  Friends
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="/photos" style={{ textDecoration: 'none', color: '#0073e6', fontWeight: 'bold' }}>
                  Photos
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Friends List</h2>
          <ul style={{ marginTop: '20px', textAlign: 'center', listStyleType: 'none', padding: 0 }}>
            {friends.map((friend) => (
              <li key={friend.id} style={{ margin: '10px 0', fontSize: '1.2em' }}>
                {friend.name}
              </li>
            ))}
          </ul>
        </main>
      </div>

      <footer
        style={{
          backgroundColor: '#0073e6',
          color: '#fff',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <p>&copy; 2025 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FriendsPage;