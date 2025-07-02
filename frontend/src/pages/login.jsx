import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Walidacja pustych pól
    if (!username.trim() || !password.trim()) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/main');
    } else {
      setError(result.message || 'Nieprawidłowe dane logowania.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
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
          {/* Komunikat o błędzie */}
          {error && <div className="login-error">{error}</div>}
          <a>
            <p className='login-pass'>Forgot password?</p>
          </a>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}