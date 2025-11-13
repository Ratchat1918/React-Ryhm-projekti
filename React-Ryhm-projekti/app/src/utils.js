import axios from "axios";

const boardUrl = "/api/boards"
const userUrl = "/api/users"
const loginUrl = "/api/login"

const getBoards =()=>{
    return axios.get(boardUrl)
    .then(response=>{
        return response.data
    }).catch(error=>{
        console.log('Error fetching data', error)
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
    axios.post(boardUrl,
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
    axios.get(userUrl)
    .then(response=>{
        return response.data
    }).catch(error=>{
        console.log('Erroe fetching data', error)
    })
}

const postUser = (userInfo) => {
  return axios.post(userUrl, userInfo)
    .then(response => {
      console.log('User created:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error posting user:', error.response?.data || error.message);
      throw error;
    });
}

const logIn = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

export {
    getBoards,
    postBoard,
    postUser,
    getUsers,
    logIn,
}