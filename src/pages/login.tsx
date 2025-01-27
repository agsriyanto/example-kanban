import React, { useState } from "react";
import { loginUser } from "../authService";
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setMessage("Login successful!");
      navigate('/');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-9 justify-self-center items-center p-7 border border-solid border-slate-300 rounded-lg w-fit shadow">
      
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
        Login to&nbsp;
        <code className="font-mono font-bold">Kanban App</code>
      </p>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;