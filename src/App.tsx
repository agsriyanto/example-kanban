import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './App.css';
import Dashboard from './pages/dashboard';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return <Dashboard />;
}

export default App
