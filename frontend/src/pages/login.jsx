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
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-2">
      <div className="
        w-full max-w-md sm:max-w-lg md:max-w-xl
        h-auto py-8 px-4 sm:px-8
        flex flex-col items-center justify-center
        bg-neutral-800 rounded-3xl
        shadow-[0_10px_40px_rgba(128,0,255,0.35)]
        ">
        <h2 className='text-6xl font-semibold mb-25 '>Log<span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-800'>in</span></h2>
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border rounded px-3 py-2 w-64 max-w-xs"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border rounded px-3 py-2 w-64 max-w-xs"
        required
      />
      <a>
        <p className="text-sm text-blue-500 hover:underline cursor-pointer mt-[-10px]">
          Forgot password?
        </p>
      </a>
      <button
        type="submit"
        className="bg-red-600 text-white w-3/7 px-6 py-2 rounded transition mt-10"
      >
        Login
      </button>
    </form>
    </div>
  </div>
  );
}