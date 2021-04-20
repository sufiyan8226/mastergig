
const CREATE_GIG = "gigs/CREATE_GIG";


const createNewGig = (gig) => ({
  type: CREATE_POST,
  payload: gig,
});

const createNewComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});
const createModalComment = (comment) => ({
  type: CREATE_MODAL_COMMENT,
  payload: comment,
});



export const uploadGig = (
 
  title,
  description,
  cost,
  userId,
  duration
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


export const rejectGiGRequest = (gigRequestId) => async (dispatch) => {
  const res = await fetch(`/api/gigs/reject/${gigRequestId}`);
};

export const acceptGiGRequest = (gigRequestId) => async (dispatch) => {
  const res = await fetch(`/api/gigs/accept/${gigRequestId}`);
};



const initialState = {
  homeFeed: {},
  exploreFeed: {},
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_GIG:
      newState = Object.assign({}, state);
      const ownerId= action.payload.ownerId;
      newState.homeFeed = { ...action.payload, ...newState.homeFeed };
      return newState;
    case CREATE_GIG_REQUEST:
      newState = Object.assign({}, state);
      const parentPostId = action.payload.parentPostId;
      newState.homeFeed[parentPostId].comments = [
        ...newState.homeFeed[parentPostId].comments,
        action.payload,
      ];
      return newState;
  }
};

//export default reducer;
