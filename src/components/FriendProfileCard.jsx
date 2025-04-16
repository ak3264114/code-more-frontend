import React from "react";
import { Box, Paper, Grid, Typography, Avatar, IconButton, Card, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CodeIcon from "@mui/icons-material/Code";

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

const FriendProfileCard = ({ friend, onDelete }) => {
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
              onClick={() => onDelete(friend.username)}
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

export default FriendProfileCard;