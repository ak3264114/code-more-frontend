import axios from "axios";

async function login(data) {
    const response  = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`, data);
    console.log('response', response)
    // return response.data;
}

const APIService = {
    login
}

export default APIService;