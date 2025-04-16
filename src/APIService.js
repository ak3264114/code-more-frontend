import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Helper for setting auth headers
const authHeader = (token) => ({
  "Content-Type": "application/json",
  Authorization: `token ${token}`,
});

// Register
async function register(body) {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, body);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Login
async function login(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Check login status
async function checklogin(loginToken) {
  try {
    const response = await axios.get(`${BASE_URL}/api/loggeduser`, {
      headers: authHeader(loginToken),
    });
    return response;
  } catch (error) {
    console.error("Check login error:", error);
    throw error;
  }
}

// Get all friends
async function getFriendsDetails(loginToken) {
  try {
    const response = await axios.get(`${BASE_URL}/api/friend/all`, {
      headers: authHeader(loginToken),
    });
    return response;
  } catch (error) {
    console.error("Fetching friends error:", error);
    throw error;
  }
}

// Get user details by username
async function getUserDetails(username) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/friend/graphqldata/${username}`,
      {
        headers: authHeader(localStorage.getItem("loginToken")),
      }
    );
    return response;
  } catch (error) {
    console.error("Get user details error:", error);
    throw error;
  }
}

// Delete a friend by ID
async function deleteFriendId(friendId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/friend/delete/${friendId}`,
      {
        headers: authHeader(localStorage.getItem("loginToken")),
      }
    );
    return response;
  } catch (error) {
    console.error("Delete friend error:", error);
    throw error;
  }
}

// Verify email
async function verifyEmail(token) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/verifyemail/${token}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Email verification error:", error);
    throw error;
  }
}

// Export all functions
const APIService = {
  register,
  login,
  checklogin,
  getFriendsDetails,
  getUserDetails,
  deleteFriendId,
  verifyEmail,
};

export default APIService;
