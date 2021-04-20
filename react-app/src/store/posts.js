const CREATE_POST = "posts/CREATE_POST";
const CREATE_COMMENT = "posts/CREATE_COMMENT";
const CREATE_MODAL_COMMENT = "posts/CREATE_MODAL_COMMENT";

const FETCH_HOME_FEED = "posts/FETCH_HOME_FEED";
const FETCH_SINGLE_POST = "posts/FETCH_SINGLE_POST";


const createNewPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

const createNewComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});
const createModalComment = (comment) => ({
  type: CREATE_MODAL_COMMENT,
  payload: comment,
});

const loadHomeFeed = (feed) => ({
  type: FETCH_HOME_FEED,
  payload: feed,
});


const loadSinglePost = (post) => ({
  type: FETCH_SINGLE_POST,
  payload: post,
});

export const uploadPost = (
  userId,
  mentionedUsers,
  hashtags,
  rawData,
  image
) => async (dispatch) => {
  mentionedUsers = mentionedUsers.map((user) => {
    return user.id;
  });

  const form = new FormData();
  form.append("userId", userId);
  form.append("mentionedUsers", JSON.stringify(mentionedUsers));
  form.append("hashtags", JSON.stringify(hashtags));
  form.append("rawData", JSON.stringify(rawData));
  form.append("image", image);
  const res = await fetch("/api/posts/", {
    method: "POST",
    body: form,
  });
  const newPost = await res.json();
  dispatch(createNewPost(newPost));
};

export const uploadComment = (
  userId,
  mentionedUsers,
  rawData,
  postId,
  modal
) => async (dispatch) => {
  mentionedUsers = mentionedUsers.map((user) => {
    return user.id;
  });
  const form = new FormData();
  form.append("userId", userId);
  form.append("mentionedUsers", JSON.stringify(mentionedUsers));
  form.append("rawData", JSON.stringify(rawData));
  form.append("parentPostId", postId);
  const res = await fetch("/api/comments/", {
    method: "POST",
    body: form,
  });
  const newComment = await res.json();
  if (!modal) {
    dispatch(createNewComment(newComment));
  } else {
    dispatch(createModalComment(newComment));
  }
};

export const fetchHomeFeed = (userId, page) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/feed/${page}`);
  let feed = await res.json();
  feed = feed["posts"];
  dispatch(loadHomeFeed(feed));
};


export const fetchSinglePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);
  let post = await res.json();
  post = post["post"];
  dispatch(loadSinglePost(post));
};

export const likeComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/posts/comments/${commentId}/like`);
};

export const unlikeComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/posts/comments/${commentId}/unlike`);
};

export const likePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/like`);
};

export const unlikePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/unlike`);
};

export const savePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/save`);
};

export const unsavePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/unsave`);
};

const initialState = {
  homeFeed: {},
  singlePost: {},
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_POST:
      newState = Object.assign({}, state);
      newState.homeFeed = { ...action.payload, ...newState.homeFeed };
      return newState;
    case CREATE_COMMENT:
      newState = Object.assign({}, state);
      const parentPostId = action.payload.parentPostId;
      newState.homeFeed[parentPostId].comments = [
        ...newState.homeFeed[parentPostId].comments,
        action.payload,
      ];
      return newState;
    case CREATE_MODAL_COMMENT:
      newState = Object.assign({}, state);
      newState.singlePost.comments = [
        ...newState.singlePost.comments,
        action.payload,
      ];
      return newState;
    case FETCH_HOME_FEED:
      newState = Object.assign({}, state);
      newState.homeFeed = { ...newState.homeFeed, ...action.payload };
      return newState;
    case FETCH_SINGLE_POST:
      newState = Object.assign({}, state);
      newState.singlePost = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
