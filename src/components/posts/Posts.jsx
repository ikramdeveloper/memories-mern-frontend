import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Post from "./post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const { mainContainer } = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className={mainContainer} container alignItems="stretch" spacing={3}>
      {posts.map((post, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
