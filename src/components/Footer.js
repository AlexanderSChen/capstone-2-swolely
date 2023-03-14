import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import logo from '../assets/images/Logo-1.png';

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#0b8fd7">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px" >
        <img src={logo} alt="logo" width="100px" height="100px" />
        <Typography variant="h4" pb="40px" mt="20px" color="white">
            Made with Love by Alexander Chen
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
