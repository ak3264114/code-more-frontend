import './App.css';
import Card from './components/Card';
import Footer from './components/Footer';
import Header from './components/Header';
// import Signup from './components/Signup';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DataContextProvider from './Context/DataContext';
import './App.css'
import Profile from './components/Profile';

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
