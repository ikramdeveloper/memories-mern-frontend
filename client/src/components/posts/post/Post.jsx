import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const { media, overlay, card, overlay2, details, title, cardActions } =
    useStyles();

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
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
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
          onClick={() => handleLikePost(post._id)}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => handleDelete(post._id)}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
