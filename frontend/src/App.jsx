import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/login.jsx';
import MainPage from './components/mainPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;