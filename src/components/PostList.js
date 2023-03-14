import React, { useState, useEffect } from "react";
import SwolelyApi from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CardActions
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    card: {
      margin: theme.spacing(2),
    },
}));


function PostList() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editedPost, setEditedPost] = useState(null);

    useEffect(() => {
    async function getPosts() {
        try {
            const posts = await SwolelyApi.getPosts();
            setPosts(posts);
        } catch (err) {
            console.error(err);
        }
    }
    getPosts();
    }, []);

    async function handleDelete(id) {
    try {
        await SwolelyApi.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
        console.error(err);
    }
    }

    const handleEdit = async (id) => {
        const post = posts.find((p) => p.id === id);
        setEditedPost(post);
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = async () => {
        try {
          const { id, ...updatedPostData } = editedPost; // Destructure id from editedPost and create updatedPostData without id
          const updatedPost = await SwolelyApi.updatePost(id, updatedPostData); // Call updatePost with updatedPostData
          setPosts((prevPosts) => prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {post.description}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {post.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleEdit(post.id)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(post.id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        value={editedPost?.title || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        fullWidth
                        value={editedPost?.description || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="body"
                        label="Body"
                        fullWidth
                        multiline
                        rows={4}
                        value={editedPost?.body || ""}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostList;
