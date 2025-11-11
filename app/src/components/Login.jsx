import React, { useState } from "react";
import { logIn } from "../utils";
import { useNavigate } from "react-router-dom";
import registerService from '../services/register'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState("");


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await logIn({ username, password })
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

  const handleRegister = async () => {
    try {
        await registerService.register({ username, password });
        setUsername("");
        setPassword("");
        setRegisterMessage("Rekisteröityminen onnistui!");
    } catch  {
        console.log("Register error");
    }
    };


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
        <button type="submit"style={{padding: 8,cursor: "pointer",}}>Kirjaudu</button>
        <button type="button" onClick={handleRegister} style={{padding: 8,cursor: "pointer",}}>Rekisteröidy</button>
        </form>
        {registerMessage && (
            <div style={{ marginTop: 20 }}>
            <strong>Rekisteröityminen onnistui</strong>
        </div>
        )}

    </div>
    );
}