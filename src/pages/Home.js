import React, { useState, useContext } from 'react';
import { Box } from '@mui/material';
import { Link } from "react-router-dom";

import Exercises from "../components/Exercises";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import UserContext from '../auth/UserContext';

/** Homepage of site
 * 
 * Shows welcome message or login/register buttons
 * 
 * Routed at /
 */

const Home = () => {
  const { currentUser } =  useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

    const [ bodyPart, setBodyPart] = useState('all');
    const [exercises, setExercises] = useState([]);

  return (
    <Box>
      <Box>
        {currentUser
          ? <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>  
          : (
            <p>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </p>
          )
        }
      </Box>
        <HeroBanner />
        <SearchExercises 
            setExercises={setExercises} 
            bodyPart={bodyPart}     
            setBodyPart={setBodyPart}
        />
        <Exercises 
            setExercises={setExercises} 
            bodyPart={bodyPart}     
            exercises={exercises}
        />
    </Box>
  )
}

export default Home
