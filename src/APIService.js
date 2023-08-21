import axios from "axios";

async function login(username, password) {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/login`,
    { username: username, password: password }
  );
  return response.data;
}

async function checklogin(loginToken) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/loggeduser`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT fefege...",
        Authorization: `token ${loginToken}`,
      },
    }
  );
  return response;
}
async function getFriendsDetails(loginToken) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/friend/all`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT fefege...",
        Authorization: `token ${loginToken}`,
      },
    }
  );
  return response;
}

async function getuserdaetails(username) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/friend/graphqldata/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT fefege...",
        Authorization: `token ${localStorage.loginToken}`,
      },
    }
  );
  return response;
}
async function deleteFriendId(friendId) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/friend/delete/${friendId}`
  const response = await axios.delete(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT fefege...",
        Authorization: `token ${localStorage.loginToken}`,
      },
    }
  );
  return response;
}



  

const APIService = {
  login,
  checklogin,
  getFriendsDetails,
  getuserdaetails,
  deleteFriendId,
};

export default APIService;
