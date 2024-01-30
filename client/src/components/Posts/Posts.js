import React from 'react'
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core'
import Post from './Post/Post.js'
import useStyles from './styles.js'

export default function Posts({setCurrentId}){
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    console.log(posts);
    return (
        !posts.length ? <CircularProgress />: (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post setCurrentId={setCurrentId} post={post}/>
                    </Grid> 
                ))}
            </Grid>
        )
    )
}