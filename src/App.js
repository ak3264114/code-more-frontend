import { BrowserRouter, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import './App.css';

// Layout components
import Header from './components/Header';
import Footer from './components/Footer';
import SnackBar from './components/SnackBar';
import LoadingSpinner from './components/LoadingSpinner'; // You'll need to create this

// Context
import DataContextProvider from './Context/DataContext';

// Lazy load route components for better performance
const Home = lazy(() => import('./components/Home'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));
const Profile = lazy(() => import('./components/Profile'));
const VerifyEmail = lazy(() => import('./components/VerifyEmail'));
const NotFound = lazy(() => import('./components/NotFound')); // You'll need to create this

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="main-content min-h-screen">
            <Suspense fallback={<LoadingSpinner />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route path="/resetpassword" component={ResetPassword} />
                <Route path="/profile" component={Profile} />
                <Route path="/verifyemail/:token" component={VerifyEmail} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </main>
          <Footer />
        </div>
        <SnackBar />
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;