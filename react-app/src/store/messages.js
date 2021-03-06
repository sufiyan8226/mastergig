
import { setUserPOJO } from './session';
const sendAMessage = async (senderId, receiverId, messageBody, dispatch) => {
  const res1 = await fetch(`/api/users/messages/receivers/${receiverId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ senderId, messageBody })
  });
  const res2 = await res1.json();

  if(!res2.errors){

    dispatch(setUserPOJO(res2.user));

  }
};


export const uploadMessage = async (
  senderId,
  receiverId,
  mentionedUsers,
  rawData,
  dispatch
) => {
  mentionedUsers = mentionedUsers.map((user) => {
    return user.id;
  });
  const form = new FormData();
  form.append("senderId", senderId);
  form.append("receiverId", receiverId);
  form.append("mentionedUsers", JSON.stringify(mentionedUsers));
  form.append("rawData", JSON.stringify(rawData));
  const res1 = await fetch("/api/users/messages", {
    method: "POST",
    body: form,
  });
  
  const res2 = await res1.json();

  if(!res2.errors){
 
    dispatch(setUserPOJO(res2.user));

  }
};

export default sendAMessage;