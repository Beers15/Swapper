import {
  SET_POST,
  SET_TERM,
  GET_POSTS,
  SET_CATEGORY,
  GET_USER_POSTS,
  RESET_CURRENT_POST
} from './types';
import axios from 'axios';

export const createSwap = values => async (dispatch, getState) => {
  console.log('Create swap action input values: ' + values.title);
  const url = `http://localhost:4002/api/post`;

  let formData = new FormData();
  formData.append('file', values.dropzone[0]);
  formData.append('userId', getState().auth.userId);
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('category', values.category);

  axios
    .post(url, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const updateSwap = values => async (dispatch, getState) => {
  const url = `http://localhost:4002/api/updateSwap`;

  let formData = new FormData();
  if (values.dropzone) {
    formData.append('file', values.dropzone[0]);
  }

  formData.append('currentImage', getState().posts.currentPost.filename);
  formData.append('postId', getState().posts.currentPost.postId);
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('category', values.category);

  axios
    .post(url, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const getPosts = () => (dispatch, getState) => {
  axios
    .get('http://localhost:4006/api/searchByTerm', {
      params: {
        term: getState().posts.term,
        category: getState().posts.category
      }
    })
    .then(res => {
      dispatch({ type: GET_POSTS, posts: res.data.results });
    })
    .catch(err => console.log(err));
};

export const getUserPosts = () => (dispatch, getState) => {
  axios
    .get('http://localhost:4002/api/getUserPosts', {
      params: {
        userId: getState().auth.userId
      }
    })
    .then(res => {
      const userPosts = res.data.result;
      if (userPosts) {
        dispatch({ type: GET_USER_POSTS, payload: userPosts });
      } else {
        dispatch({ type: GET_USER_POSTS, payload: [] });
      }
    })
    .catch(err => console.log(err));
};

export const deletePost = (postId, filename) => (dispatch, getState) => {
  console.log(filename);
  axios
    .get('http://localhost:4002/api/deletePost', {
      params: {
        postId: postId,
        filename: filename
      }
    })
    .then(res => {
      console.log('Deleted Post');
    });
};

export const setCurrentPost = values => async (dispatch, getState) => {
  axios
    .get('http://localhost:4002/api/getPost', {
      params: { postId: values }
    })
    .then(res => {
      if (res.data.valid) {
        return dispatch({ type: SET_POST, post: res.data.result[0] });
      }
      console.log(res.data.err);
    })
    .catch(err => console.log(err));
};

export const resetCurrentPost = () => dispatch => {
  dispatch({ type: RESET_CURRENT_POST });
};

export const setTerm = values => async (dispatch, getState) => {
  dispatch({ type: SET_TERM, term: values });
};

export const setCategory = value => dispatch => {
  dispatch({ type: SET_CATEGORY, category: value });
};
