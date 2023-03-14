import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

const App = () => (
  <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
      <Route path="/login" login={login} element={<LoginForm />}/>
      <Route path="/signup" signup={signup} element={<SignupForm />}/>
    </Routes>
    <Footer />
  </Box>
);

export default App;