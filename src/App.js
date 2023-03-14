import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import useLocalStorage from './hooks/useLocalStorage';
import SwolelyApi from './api/api';
import UserContext from './auth/UserContext';
// import jwt from "jsonwebtoken"; 
// import process from 'process/browser';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from '../src/components/Loader';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

// key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "swolely-token";


function App(){
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run . it only needs to re-run when a user logs out so the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function getCurrentUser() {
      if(token) {
        try {
          // let { username } = jwt.decode(token);
          let { username } = token;
          // put the token on the Api class so it can use it to call the API.
          SwolelyApi.token = token;
          let currentUser = await SwolelyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch(err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // setInfoLoaded to false while async getCurrentUser runs; once the data is fetched (or if error happens), this will be set back to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup 
   * Automatically logs them in (set token ) upon signup.
   * 
   * Make sure to await the function and check its return value
  */
  async function signup(signupData) {
    try {
      let token = await SwolelyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(err) {
      console.error("signup failed", err);
      return { success: false, err};
    }
  }

  /** Handles site-wide login.
   * Make sure to await and check its return value
   */
  async function login(loginData) {
    try {
      let token = await SwolelyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch(err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  if(!infoLoaded) return <Loader />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
          <Navbar logout={logout} />
          <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/blog" element={<Blog />}/>
              <Route path="/login" element={<LoginForm login={login} />}/>
              <Route path="/signup" element={<SignupForm signup={signup} />}/>
          </Routes>
          <Footer />
      </Box>
    </UserContext.Provider>
  )
}

export default App

