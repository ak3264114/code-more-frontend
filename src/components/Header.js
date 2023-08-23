import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 240;

function Header(props) {
  const { isLoggedIn } = useContext(DataContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    console.log("clicked");
    window.location.reload();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to={"/"}>Code More</Link>
      </Typography>
      <Divider />
      {/* mobile menu */}

      <List>
        <div className="flex flex-col">
          {isLoggedIn ? (
            <div className="p-2 hover:bg-[#e7e7e7]" onClick={handleLogout}>
            Logout
          </div>
          ) : (
            <>
              <div className="p-2 hover:bg-[#e7e7e7]">
                <Link to={"/signup"}>Sign Up</Link>
              </div>
              <div className="p-2 hover:bg-[#e7e7e7]">
                <Link to={"/login"}>Login</Link>
              </div>
            </>
          )}
        </div>
      </List>
    </Box>
  );

  // const { window } = props;

  const container = undefined;

  return (
    <>
      <Box sx={{ display: "flex", height: "80px" }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link className="navbar-brand" to={"/"}>
                Code More
              </Link>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {isLoggedIn ? (
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/signup"}>Sign Up</Link>
                  </Button>
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default Header;
