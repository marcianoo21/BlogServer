import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('Zalogowano pomyślnie');
      } else {
        alert(data.message || 'Błąd logowania');
      }
     
      // console.log('token', data.token)
      // console.log(response.ok)
    } catch (error) {
      alert('Błąd logowania');
      console.error('Error logging in:', error);
    }
  }

  async function showlMessages() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:3000/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessage(data);
      console.log('Message:', data);
    } catch (error) {
      console.error('Error calling message:', error)
    }
  }

  return (
    <>
      <h2>Logowanie</h2>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>Zaloguj</button>
      <button onClick={showlMessages}>Wywołaj /posts</button>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </>
  )
}

export default App;