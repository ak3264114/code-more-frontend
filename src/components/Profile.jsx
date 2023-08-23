import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Button, Skeleton } from "@mui/material";
import { useEffect } from "react";
import APIService from "../APIService";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../Context/DataContext";

const Profile = () => {
  const [formData, setFormData] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setSnackType, setSnackMessage, setSnackOpen } =useContext(DataContext);

  const handeleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    APIService.getFriendsDetails(localStorage.loginToken)
    .then((data) => {
      setFriendsData(data.data);
      setLoading(false);
      setSnackType("success");
      setSnackMessage("Data Fatched Successfully");
      setSnackOpen(true)
    }).catch((error) => {
      setSnackType("error");
      setSnackMessage("Oops an eroor occured !");
      setSnackOpen(true);
      setLoading(false);
    })
  }, []);
  const deleteFriendId = async (friendId) => {
    try {
      const result = await APIService.deleteFriendId(friendId);
      console.log(result);
      window.location.reload();
      setSnackType("success");
      setSnackOpen(true);
      setSnackMessage("Your FriendId Deleted Successfully");
    } catch (error) {
      setSnackType("error");
      setSnackMessage("Oops an eroor occured !");
      setSnackOpen(true);
    }
  };

  const handlesubmit = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/friend/add`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.loginToken}`,
      },
      body: JSON.stringify(formData),
    };
    fetch(url, options)
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-wrap justify-center">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            width: 320,
            height: 640,
            justifyContent: "center",
            borderRadius: "8px",
          },
        }}
      >
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              width={320}
              height={640}
              sx={{ backgroundColor: "#1A1110" }}
            />
            <Skeleton
              variant="rectangular"
              width={320}
              height={640}
              sx={{ backgroundColor: "#1A1110" }}
            />
            <Skeleton
              variant="rectangular"
              width={320}
              height={640}
              sx={{ backgroundColor: "#1A1110" }}
            />
            <Skeleton
              variant="rectangular"
              width={320}
              height={640}
              sx={{ backgroundColor: "#1A1110" }}
            />
          </>
        ) : null}
        {friendsData?.map((item) => (
          <Paper sx={{ backgroundColor: "#0f172a" }}>
            <Grid container>
              <Grid item xs={6}>
                <div className="p-5">
                  <img className="rounded-full" src={item?.userAvatar} alt="" />
                </div>
              </Grid>
              <Grid
                xs={5}
                sx={{ display: "grid", alignContent: "center", color: "white" }}
              >
                <Grid xs={12} sx={{ fontSize: "24px" }}>
                  {item?.realName}
                </Grid>
                <Grid xs={12} sx={{ fontSize: "16px" }}>
                  {item?.username}
                </Grid>
              </Grid>
              <Grid
                xs={1}
                sx={{
                  display: "grid",
                  color: "white",
                  padding: "10px 15px 0px 0px",
                }}
              >
                <DeleteIcon
                  color="warning"
                  onClick={() => {
                    deleteFriendId(item?.username);
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                sx={{ color: "white", padding: "0px 15px", fontSize: "20px" }}
              >
                Contest Details
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {" "}
                    {item.attendedContestsCount || 0}{" "}
                  </span>
                  <span className="text-l">Attended</span>
                </div>
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl  font-bold">
                    {Math.floor(item.rating) || "N/A"}
                  </span>
                  <span className="text-l"> Rating</span>
                </div>
              </Grid>
              <Grid xs={12} sx={{ padding: "15px" }}>
                <div className="flex py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {item.globalRanking || "N"}/{item.totalParticipants || "A"}
                  </span>
                  <span className="text-l">Global Ranking</span>
                </div>
              </Grid>
              <Grid
                xs={12}
                sx={{ color: "white", padding: "0px 15px", fontSize: "20px" }}
              >
                Problems Solved
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex  py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "All"
                      ).solved
                    }
                    /
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "All"
                      ).count
                    }
                  </span>
                  <span className="text-l">Total</span>
                </div>
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex  py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Easy"
                      ).solved
                    }
                    /
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Easy"
                      ).count
                    }
                  </span>
                  <span className="text-l">Easy</span>
                </div>
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex  py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Medium"
                      ).solved
                    }
                    /
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Medium"
                      ).count
                    }
                  </span>
                  <span className="text-l">Medium</span>
                </div>
              </Grid>
              <Grid xs={6} sx={{ padding: "15px" }}>
                <div className="flex  py-3 flex-col items-center text-center text-white bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-600 rounded-md">
                  <span className="text-xl font-bold">
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Hard"
                      ).solved
                    }
                    /
                    {
                      item.problemsolved.find(
                        (item) => item.difficulty === "Hard"
                      ).count
                    }
                  </span>
                  <span className="text-l">Hard</span>
                </div>
              </Grid>
              <Grid></Grid>
            </Grid>
          </Paper>
        ))}
        <Box
          className="flip-card"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: 320,
              height: 640,
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "8px",
            },
          }}
        >
          <div class={`flip-card-inner ${formOpen ? "rorateY" : ""}`}>
            <div class="flip-card-front">
              <Button
                onClick={() => {
                  setFormOpen(true);
                }}
              >
                <AddSharpIcon color="success" fontSize="large" />
              </Button>
            </div>
            <div class="flip-card-back p-5 ">
              <div className="form-item ">
                <input type={"text"} name="username" value={"amit"} disabled />
              </div>
              <div className="form-item">
                <input
                  type={"text"}
                  name="friendsId"
                  placeholder={"Friend's User id"}
                  onChange={(e) => {
                    handeleChange(e);
                  }}
                />
              </div>
              <div className="form-item">
                <select name="sitename" className="input">
                  <option value="leetcode">Leetcode</option>
                </select>
              </div>
              <div className="bg-black focus:bg-red-500">
                <Button onClick={handlesubmit}>SUbmit</Button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
