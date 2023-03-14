import React from 'react'
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import logo from '../assets/images/Logo.png';

const Navbar = () => {
  return (
    <Stack direction="row" justify-content="space-around" sx={{ gap: { sm: '122px', xs: '40px' }, mt: {sm: '32px', xs: '20px' }, justifyContent: 'none'}} px="20px">
        <Link to="/">
            <img src={logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0 20px' }} />
        </Link>
        <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
            <Link to="/" style={{ textDecoration: 'none', color: 'gold', borderBottom: '3px solid gold' }}>Home</Link>
            <a href="#exercises" style={{ textDecoration: 'none', color: 'gold'}}>Exercises</a>
            <Link to="/blog" style={{ textDecoration: 'none' }}>Blog</Link>
        </Stack>
    </Stack>
  )
}

export default Navbar
