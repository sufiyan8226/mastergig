import { loadProfileBasicInfoPOJO } from './profile';
import { setUserPOJO } from './session';


const fetchAFollowing = async (personToFollowId, profilePersonId, do_follow, dispatch) => {
  const res1 = await fetch(`/api/users/follow/${personToFollowId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ do_follow })
  });
  const res2 = await res1.json();

  if(!res2.errors){
    dispatch(setUserPOJO(res2.follower));
    if(personToFollowId === profilePersonId)
      dispatch(loadProfileBasicInfoPOJO(res2.followee))
  }
};


export default fetchAFollowing;