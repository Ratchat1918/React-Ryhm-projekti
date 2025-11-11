import { getBoards } from "../utils"
import { useState, useEffect } from 'react';

const Gallery =()=>{
    const styles={
        gallery:{
            width:'275px',
            height:'275px',
            border:"1px solid black",
            gap:"5px",
            margin:'5px'
        }
    }
    const [boardList, setBoardList] = useState([]);
        useEffect(() => {
        const fetchBoards = async () => {
        const boards = await getBoards();
        console.log("Fetched boards:", boards);
        setBoardList(boards || []);
        };
        fetchBoards();
    }, []);

    return(
        <div>
            <h1><strong>My gallery</strong></h1>
            {boardList.map(canva=>{
                if(canva.boards && (Array.isArray(canva.boards) || typeof canva.boards === 'string') && canva.boards.includes('data:image/png')){
                    return <img style={styles.gallery} src={canva.boards}></img>
                }
            })}
        </div>
    )
}
export default Gallery
