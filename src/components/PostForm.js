import React, { useState } from "react";
import SwolelyApi from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));

function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  let id = 1;

  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = await SwolelyApi.addPost({ title, description, body, id });
      console.log("New post:", newPost);
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
            Create a new post
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                >
                <MenuItem value={"Strength"}>Strength</MenuItem>
                <MenuItem value={"Cardio"}>Cardio</MenuItem>
                <MenuItem value={"Yoga"}>Yoga</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={8}
                id="body"
                label="Body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
        >
            Submit
        </Button>
        </form>
    );
}

export default PostForm;

