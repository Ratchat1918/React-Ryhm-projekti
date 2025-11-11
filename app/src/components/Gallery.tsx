import { useEffect, useRef } from "react";
import { getBoards } from "../utils"

const Gallery =(props)=>{
    const reference=useRef(null);
    let boardList =getBoards()
    const renderBoard=(ctx,canva)=>{
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        canva.map((b)=>{
            ctx.fillStyle = b.colour;
            ctx.fillRect(b.posX,b.posY,50,50); 
        })
    }
    useEffect(()=>{
        const canvas = reference.current;
        const ctx = canvas.getContext('2d');
    })
    return(
        <div>
            {boardList.map(canva=>
                
                <div></div>
            )}
            <canvas ref={reference} {...props}></canvas>
        </div>
    )
}
export default Gallery