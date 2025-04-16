
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import APIService from "../APIService";
import { Container, Typography, Grid } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";


import FriendProfileCard from "./FriendProfileCard";
import AddFriendCard from "./AddFriendCard";
import AddFriendDialog from "./AddFriendDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import LoadingSkeleton from "./LoadingSkeleton";

const Profile = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFriendData, setNewFriendData] = useState({
    username: "",
    friendsId: "",
    sitename: "leetcode"
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);

  const { isLoggedIn, setSnackOpen, userName } = useContext(DataContext);
  const history = useHistory();

  useEffect(() => {

    const fetchFriendsData = async () => {
      try {
        const response = await APIService.getFriendsDetails(localStorage.loginToken);
        setFriendsData(response.data);
        setSnackOpen({
          type: "success", 
          message: response.data.message || "Friends data loaded successfully"
        });
      } catch (error) {
        setSnackOpen({
          type: "error", 
          message: error.response?.data?.message || "Failed to load friends data"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendsData();
  }, [setSnackOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFriendData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFriend = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/friend/add`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.loginToken}`,
        },
        body: JSON.stringify({
          ...newFriendData,
          username: userName
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      
      setSnackOpen({
        type: data.status === "success" ? "success" : "error", 
        message: data.message || "Request completed"
      });
      
      if (data.status === "success") {
        const updatedData = await APIService.getFriendsDetails(localStorage.loginToken);
        setFriendsData(updatedData.data);
        setIsAddDialogOpen(false);

        setNewFriendData({
          username: "",
          friendsId: "",
          sitename: "leetcode"
        });
      }
    } catch (error) {
      setSnackOpen({
        type: "error", 
        message: "Failed to add friend"
      });
    }
  };

  const openDeleteConfirm = (username) => {
    setFriendToDelete(username);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteFriend = async () => {
    try {
      await APIService.deleteFriendId(friendToDelete);

      const updatedData = await APIService.getFriendsDetails(localStorage.loginToken);
      setFriendsData(updatedData.data);
      
      setSnackOpen({
        type: "success", 
        message: "Friend removed successfully"
      });
      
      setDeleteConfirmOpen(false);
      setFriendToDelete(null);
    } catch (error) {
      setSnackOpen({
        type: "error", 
        message: "Failed to remove friend"
      });
    }
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" className="text-center font-bold text-slate-800">
        <LeaderboardIcon className="my-6" /> My Coding Friends
      </Typography>

      <Grid container spacing={4}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {friendsData?.map((friend) => (
              <Grid item xs={12} md={6} lg={4} key={friend.username}>
                <FriendProfileCard friend={friend} onDelete={openDeleteConfirm} />
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={4}>
              <AddFriendCard onClick={() => setIsAddDialogOpen(true)} />
            </Grid>
          </>
        )}
      </Grid>

      <AddFriendDialog 
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        userName={userName}
        newFriendData={newFriendData}
        onInputChange={handleInputChange}
        onAddFriend={handleAddFriend}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteFriend}
      />
    </Container>
  );
};

export default Profile;