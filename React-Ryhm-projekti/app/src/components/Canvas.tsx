import { useState, useEffect, useRef } from "react"
import { boardInfo } from "../board";
import { postBoard } from "../utils";
const Canvas = (props)=>{ 
    const [message, setMessage] = useState("");
    const reference=useRef(null);
    const [brushColour, setBrushColour] = useState("#000000")
    let blocks = boardInfo;
    const renderBoard=(ctx)=>{
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        blocks.map((b)=>{
            ctx.fillStyle = b.colour;
            ctx.fillRect(b.posX,b.posY,50,50); 
        })
    }
    
    const resetBoard =()=>{
        console.log('reset')
        window.location.reload();
    }
    const sendToGallery = (reference)=>{
        var imgUrl = reference.current.toDataURL()
        postBoard(imgUrl)
        setMessage("Postaaminen onnistui! Board tallennettu Galleryyn")
        setTimeout(() => window.location.reload(), 10000)
    } 

    useEffect(() => {
        const canvas = reference.current;
        const ctx = canvas.getContext('2d');

        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
           // console.log(`Mouse clicked at: ${x}, ${y}`);
            const cellX = Math.floor(x / 50) * 50;
            const cellY = Math.floor(y / 50) * 50;
            //console.log(`Mouse clicked at: ${cellX}, ${cellY}`);
            const idx = blocks.findIndex(b => b.posX === cellX && b.posY === cellY);
            if (idx !== -1) {
                blocks[idx].colour = brushColour;
            }
            renderBoard(ctx);
        };

        canvas.addEventListener('click', handleClick);
        //initial render
        renderBoard(ctx);

        return () => canvas.removeEventListener('click', handleClick);
    }, [brushColour]);

    return(
        <div>
            <canvas ref={reference} {...props}></canvas>
            <input value={brushColour} onChange={(event)=>setBrushColour(event.target.value)} type="color"></input>
            <button onClick={() => resetBoard()}>Reset Board</button>
            <button onClick={() => sendToGallery(reference)}>Save Board</button>
            {message && <div style={{ marginTop: 20, fontWeight: "bold" }}>{message}</div>}
        </div>
    )
}

export default Canvas

