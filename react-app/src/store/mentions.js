const FETCH_USER_MENTIONS = "mentions/FETCH_USER_MENTIONS";

const FETCH_USER_MENTIONS_COMMENTS = "mentions/FETCH_USER_MENTIONS_COMMENTS";

const CLEAR_MENTIONS = "mentions/CLEAR_MENTIONS";

const initialState = {
  users: [],

  usersComments: [],
 
};

const loadUserMentions = (users) => ({
  type: FETCH_USER_MENTIONS,
  payload: users,
});



const loadUserMentionsComments = (users) => ({
  type: FETCH_USER_MENTIONS_COMMENTS,
  payload: users,
});


export const clearMentions = () => ({
  type: CLEAR_MENTIONS,
});

export const fetchUserMentions = (query) => async (dispatch) => {
  const res = await fetch(`/api/users/mentions/${query}`);
  const users = await res.json();
  dispatch(loadUserMentions(users));
};


export const fetchUserMentionsComments = (query) => async (dispatch) => {
  const res = await fetch(`/api/users/mentions/${query}`);
  const users = await res.json();
  dispatch(loadUserMentionsComments(users));
};



const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_USER_MENTIONS:
      newState = Object.assign({}, state);
      newState.users = action.payload.users;
      return newState;
    case FETCH_USER_MENTIONS_COMMENTS:
      newState = Object.assign({}, state);
      newState.usersComments = action.payload.users;
      return newState;
    case CLEAR_MENTIONS:
      newState = Object.assign({}, state);
      newState.users = [];
      newState.hashtags = [];
      newState.usersComments = [];
      newState.hashtagsComments = [];
      return newState;
    default:
      return state;
  }
};

export default reducer;
