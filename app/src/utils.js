import axios from "axios";

const postBoard = (boardInfo) =>{
    axios.post('http://localhost:3001/api/boards/',{
        board:boardInfo
    }).then(response => {
        console.log('Data posted successfully:', response.data);
    })
    .catch(error => {
        console.error('Error posting data:', error);
    });
}

const getUsers =()=>{
    axios.get('http://localhost:3001/api/users/')
    .then(response=>{
        console.log(response.data)
    }).catch(error=>{
        console.log('Erroe fetching data')
    })
}

const postUser = (userInfo) =>{
    axios.post('http://localhost:3001/api/users/',{
        board:boardInfo
    }).then(response => {
        console.log('Data posted successfully:', response.data);
    })
    .catch(error => {
        console.error('Error posting data:', error);
    });
}

export {
    postBoard,
    postUser,
    getUsers
}