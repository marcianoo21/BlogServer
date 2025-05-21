import { useState } from 'react'

const [message, setMessage] = useState({})

  export async function showMessages() {
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