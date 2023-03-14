import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import { Box, Typography } from '@mui/material';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

/** Blog page
 * Shows welcome message or login/register buttons.
 * Routed at Blog
 */

const Blog = () => {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <Box sx={{
            mt: { lg: '100px', xs: '80px'},
            ml: { sm: '69px' }
        }} position="relative" p="25px">
            <Typography color="gold" fontWeight="600" fontSize="100px">
                Fortify Your Mind
            </Typography>
            {/* {currentUser
                ? <Typography variant="h3">Welcome Back, {currentUser.firstName || currentUser.username}!</Typography>
                : (
                    <p>
                        <Link to="/login">Log In</Link>/
                        <Link to="/signup">Sign Up</Link>
                    </p>
                )} */}
            <PostList />
            <PostForm />
        </Box>
    )
}

export default Blog;
