import axios from "axios";

const getBoards =()=>{
    return axios.get('http://localhost:3001/api/boards/')
    .then(response=>{
        return response.data
    }).catch(error=>{
        console.log('Error fetching data')
    })
}

const postBoard = (boardInfo) =>{
    let userData = localStorage.getItem('loggedIn');
    userData = JSON.parse(userData);

    const token = userData.token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log(token)
    axios.post('http://localhost:3001/api/boards/', 
        {boards:boardInfo}, 
        config
    ).then(response => {
        console.log('Data posted successfully:', response.data);
    })
    .catch(error => {
        console.error('Error posting data:', error);
    });
}

const getUsers =()=>{
    axios.get('http://localhost:3001/api/users/')
    .then(response=>{
        return response.data
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

const logIn = async credentials => {
  const response = await axios.post('http://localhost:3001/api/login', credentials)
  return response.data
}

export {
    getBoards,
    postBoard,
    postUser,
    getUsers,
    logIn,
}