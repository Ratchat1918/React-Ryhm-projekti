import React, { useState } from "react";
import loginService from '../services/login'
import { useNavigate } from "react-router-dom";


export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)
  const navigate = useNavigate();


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      onLogin(user);
      setUser(user)
      setUsername('')
      setPassword('')
      navigate("/");
      window.localStorage.setItem(
        'loggedIn', JSON.stringify(user)
      ) 
    } catch {
        console.log("Error")
    }
  }

    return (
    <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
            <input
            type="text"
            placeholder="Käyttäjätunnus"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div style={{ marginBottom: 10 }}>
            <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button
            type="submit"
            style={{
            padding: 8,
            cursor: "pointer",
            }}
        >
            Kirjaudu
        </button>
        </form>

        {user && (
        <div style={{ marginTop: 20 }}>
            <strong>Kirjautunut:</strong> {user.username}
        </div>
        )}
    </div>
    );

}
