import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";
import Likes from "./Likes";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const { media, overlay, card, overlay2, details, title, cardActions } =
    useStyles();
  const user = JSON.parse(localStorage.getItem("Profile"));

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikePost = (id) => {
    dispatch(likePost(id));
  };

  return (
    <Card className={card}>
      <CardMedia
        className={media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={overlay2}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className={details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => ` #${tag}`)}
        </Typography>
      </div>
      <Typography className={title} variant="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => handleLikePost(post._id)}
        >
          <Likes post={post} user={user} />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => handleDelete(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
