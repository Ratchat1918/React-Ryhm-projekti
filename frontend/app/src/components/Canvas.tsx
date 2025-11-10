import { useState, useEffect, useRef } from "react"
import { boardInfo } from "../board";
const Canvas = (props)=>{ 
    const reference=useRef();
    const [mousePos, setMousePos] = useState({x:null, y:null})//varaible of posiotion of the mouse on canvas
    const [brushColour, setBrushColour] = useState("#000000")
    let blocks = boardInfo;
    const renderBoard=(ctx)=>{
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        blocks.map((b)=>{
            ctx.fillStyle = b.colour;
            ctx.fillRect(b.posX,b.posY,50,50); 
        })
    }
    const changeBoard=(mousePos: { x: number; y: number; },brushColour:string, ctx)=>{//changes colour of block according to it's coordinates
        //first row
        if(mousePos.x>=0 && mousePos.x<=49 && mousePos.y>=0 && mousePos.y<=49 && mousePos.x!=null && mousePos.y!=null){
            ctx.clearRect(0,0,50,50)
            ctx.fillStyle = brushColour;
            ctx.fillRect(0,0,50,50); 
            //blocks[0].colour=brushColour 
        }
    }
    const resetBoard =()=>{
        console.log('reset')
        blocks=boardInfo  
    }

    function getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        if(x!=mousePos.x && y!=mousePos.y){
            setMousePos({x:x,y:y})
        }
    }
    useEffect(()=>{
        const canvas = reference.current
        const ctx = canvas.getContext('2d')
        canvas.addEventListener('click',(event)=>{
            getMousePosition(canvas,event)
        })
        changeBoard(mousePos,brushColour,ctx)
        renderBoard(ctx)
    },);

    return(
        <div>
            <canvas ref={reference} {...props}></canvas>
            <input value={brushColour} onChange={(event)=>setBrushColour(event.target.value)} type="color"></input>
            <button onClick={()=>resetBoard}>Reset Board</button>
        </div>
    )
}
export default Canvas