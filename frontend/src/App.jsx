import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Main, Test } from '../src/pages';
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
       <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;