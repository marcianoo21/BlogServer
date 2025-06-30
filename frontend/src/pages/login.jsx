import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
       navigate('/main');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h2 className='login-title '>Log<span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-800'>in</span></h2>
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="login-input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="login-input"
        required
      />
      <a>
        <p className="text-sm text-blue-500 hover:underline cursor-pointer mt-[-10px]">
          Forgot password?
        </p>
      </a>
      <button
        type="submit"
        className="login-btn"
      >
        Login
      </button>
    </form>
    </div>
  </div>
  );
}