import React from 'react';
import { Box, Typography, Button } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
  return (
    <Box sx={{
        mt: { lg: '180px', xs: '70px'},
        ml: { sm: '50px'}
    }} position="relative" p="20px">
        <Typography color="gold" fontWeight="600" fontSize="54px">
            Swolely
        </Typography>
        <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px'}}} mb="23px" mt="30px">
            The Best <br /> Exercise App
        </Typography>
        <Typography fontSize="30px" lineHeight="35px" mb={2}>
            Check out the most effective exercises
        </Typography>
        <Button variant="contained" color="error" href="#exercises" sx={{backgroundColor: 'gold', padding: "10px", color: "black" }}>Explore Exercises</Button>
        <Typography fontWeight={600} color="#ff2625" sx={{
            opacity: 0.1,
            display: { lg: 'block', xs: 'none' }
        }} fontSize="200px">
            SWEAT
        </Typography>
        <img src={HeroBannerImage} alt="banner" className='hero-banner-img' />
    </Box>
  )
}

export default HeroBanner
