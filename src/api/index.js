import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    const token = JSON.parse(localStorage.getItem("Profile")).token;
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// const url = "https://memories-full-stack-mern-app.herokuapp.com/posts";

const fetchPosts = () => API.get("/posts");

const createPost = (newPost) => API.post("/posts", newPost);

const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

const deletePost = (id) => API.delete(`/posts/${id}`);

const likePost = (id) => API.patch(`/posts/${id}/likePost`);

const login = (formData) => API.post("/users/login", formData);

const signUp = (formData) => API.post("/users/signup", formData);

export {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  login,
  signUp,
};
