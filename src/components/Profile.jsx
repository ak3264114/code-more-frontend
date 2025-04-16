import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import APIService from "../APIService";

// Material UI imports
import { 
  Box, 
  Paper, 
  Grid, 
  Button, 
  Skeleton, 
  Typography, 
  Avatar, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem, 
  Container, 
  Card, 
  CardContent 
} from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

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

  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  // Fetch friends data
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
        // Refresh data instead of full page reload
        const updatedData = await APIService.getFriendsDetails(localStorage.loginToken);
        setFriendsData(updatedData.data);
        setIsAddDialogOpen(false);
        
        // Reset form
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
      
      // Refresh data instead of reloading page
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

  // Card for displaying metrics
  const StatCard = ({ title, value, color }) => (
    <Grid item xs={12} sm={6}>
      <Card className={`bg-gradient-to-br from-${color}-700 to-${color}-900 text-white h-full`}>
        <CardContent className="flex flex-col items-center justify-center p-4 text-center">
          <Typography variant="h5" component="div" className="font-bold">
            {value}
          </Typography>
          <Typography variant="body2" className="mt-1">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  // Profile card component
  const FriendProfileCard = ({ friend }) => {
    // Find problem solved statistics
    const getStats = (difficulty) => {
      const stat = friend.problemsolved.find(item => item.difficulty === difficulty);
      return stat ? `${stat.solved}/${stat.count}` : "N/A";
    };

    return (
      <Paper elevation={3} className="bg-slate-900 text-white rounded-lg overflow-hidden">
        <Box className="p-4">
          {/* Header with avatar and name */}
          <Grid container spacing={2} alignItems="center" className="mb-4">
            <Grid item xs={3}>
              <Avatar
                src={friend.userAvatar}
                alt={friend.realName}
                className="w-16 h-16 border-2 border-indigo-300"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" className="font-bold">{friend.realName}</Typography>
              <Typography variant="body2" className="text-gray-300">@{friend.username}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => openDeleteConfirm(friend.username)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* Contest Details Section */}
          <Box className="mb-4">
            <Typography variant="subtitle1" className="flex items-center mb-2">
              <EmojiEventsIcon className="mr-2" fontSize="small" />
              Contest Details
            </Typography>
            <Grid container spacing={2}>
              <StatCard 
                title="Contests Attended" 
                value={friend.attendedContestsCount || 0} 
                color="purple"
              />
              <StatCard 
                title="Rating" 
                value={Math.floor(friend.rating) || "N/A"} 
                color="indigo"
              />
              <Grid item xs={12}>
                <Card className="bg-gradient-to-br from-violet-700 to-indigo-600 text-white">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <Typography variant="h5" component="div" className="font-bold">
                      {friend.globalRanking || "N"}/{friend.totalParticipants || "A"}
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      Global Ranking
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Problems Solved Section */}
          <Box>
            <Typography variant="subtitle1" className="flex items-center mb-2">
              <CodeIcon className="mr-2" fontSize="small" />
              Problems Solved
            </Typography>
            <Grid container spacing={2}>
              <StatCard title="Total" value={getStats("All")} color="blue" />
              <StatCard title="Easy" value={getStats("Easy")} color="green" />
              <StatCard title="Medium" value={getStats("Medium")} color="yellow" />
              <StatCard title="Hard" value={getStats("Hard")} color="red" />
            </Grid>
          </Box>
        </Box>
      </Paper>
    );
  };

  // Add friend card
  const AddFriendCard = () => (
    <Paper 
      elevation={3} 
      className="bg-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors duration-300"
      onClick={() => setIsAddDialogOpen(true)}
      sx={{ height: '100%', minHeight: '200px' }}
    >
      <Box className="text-center p-4">
        <AddIcon style={{ fontSize: 60 }} className="text-green-500 mb-2" />
        <Typography variant="h6">Add Friend</Typography>
      </Box>
    </Paper>
  );

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4].map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item}>
          <Skeleton 
            variant="rectangular" 
            height={500} 
            sx={{ backgroundColor: "#2a2a2a", borderRadius: 2 }} 
          />
        </Grid>
      ))}
    </>
  );

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" className="mb-6 text-center font-bold text-slate-800">
        <LeaderboardIcon className="mr-2" /> My Coding Friends
      </Typography>

      <Grid container spacing={4}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {friendsData?.map((friend) => (
              <Grid item xs={12} md={6} lg={4} key={friend.username}>
                <FriendProfileCard friend={friend} />
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={4}>
              <AddFriendCard />
            </Grid>
          </>
        )}
      </Grid>

      {/* Add Friend Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <PersonAddIcon className="mr-2" />
              Add Coding Friend
            </Box>
            <IconButton onClick={() => setIsAddDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your Username"
                value={userName}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Friend's Profile URL"
                name="friendsId"
                value={newFriendData.friendsId}
                onChange={handleInputChange}
                placeholder="https://leetcode.com/username"
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Platform"
                name="sitename"
                value={newFriendData.sitename}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="leetcode">LeetCode</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleAddFriend} 
            variant="contained" 
            color="primary"
            startIcon={<PersonAddIcon />}
          >
            Add Friend
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this friend from your list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteFriend} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;