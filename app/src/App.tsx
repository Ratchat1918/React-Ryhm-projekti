import Canvas from "./components/Canvas"
import Gallery from './components/Gallery'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom"

function App() {
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
  const canvaParam={
    width:"400",
    height:"400",
  }
  return (
    <>
    <div style={styles.container}>
      <Router>
        <div style={styles.header}>
          <Link style={{gap:'10px'}} to='/'>Main page</Link>
          <Link style={{gap:'10px'}} to='/gallery'>Gallery</Link>
        </div>
        <Routes>
          <Route path="/" element={<Canvas width={canvaParam.width} height={canvaParam.height} style={styles.canvas}></Canvas>}></Route>
          <Route path="/gallery" element={<Gallery></Gallery>}></Route>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App