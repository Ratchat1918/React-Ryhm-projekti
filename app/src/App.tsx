import Canvas from "./components/Canvas";
import Gallery from "./components/Gallery";
import LoginForm from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  const styles ={
    container:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      height:'90vh',
    },
    header:{
      display:'flex',
      flexDirection:'row',
      color:'#ffffff',
      backgroundColor:'#f95c5cff',
      position:'absolute',
      top:'0',
      width:'100%',
      height:'36px',
    },
    canvas:{
      display:'flex',
      border:"1px solid black",
    }
  } 

  const canvaParam = {
    width: "400",
    height: "400",
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedIn");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = (loggedUser) => setUser(loggedUser);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedIn");
  };

  return (
    <div style={styles.container}>
      <Router>
        <div style={styles.header}>
          <Link to="/">Main page</Link>
          <Link to="/gallery">Gallery</Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <div style={{}}>
              <span>{user.username} logged in</span>
              <button onClick={handleLogout} style={{border: "none", padding: "6px", cursor: "pointer",}}>Logout</button>
            </div>
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Canvas
                width={canvaParam.width}
                height={canvaParam.height}
                style={styles.canvas}
              />
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
