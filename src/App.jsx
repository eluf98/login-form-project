import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Success from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;