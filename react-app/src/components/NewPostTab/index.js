import "./NewPostTab.css";
import React, { useState } from "react";
import NewPostModal from "../NewPostModal";
import NewPostModalNav from "../NewPostModalNav";
import NewPost from "../NewPost";
import { useDispatch, useSelector } from "react-redux";

import {
  BsBell,
  BsClockHistory,
  BsPlusSquare,
  BsCameraVideo,
  BsTag,
  BsChat,
  BsInfoCircle,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import NotificationCenter from "../NotificationCenter";

const NewPostTab = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifHover, setNotifHover] = useState(false);
  const [initial, setInitial] = useState(1);
  const history = useHistory();
  return (
    <div
      className={
        notifHover ? "post-tab-container notif-hover" : "post-tab-container"
      }
    >
      <div
        onClick={() => history.push("/video/myVideo")}
        className="post-tab-new-post"
      >
        <BsPlusSquare className="hvr-grow" />
      </div>
      <div
        onClick={() => history.push("/stream/info")}
        className="post-tab-new-story"
      >
        <BsInfoCircle className="hvr-grow" />
      </div>
      <div
        className="notification-buttons"
        onMouseOver={() => setNotifHover(true)}
        onMouseOut={() => setNotifHover(false)}
      >
        <div
          onClick={() => {
            setInitial(1);
            setIsNotifOpen(true);
          }}
          className="hvr-grow post-tab-notifications all-notifs"
        >
          <BsBell />
          {notifications.total > 0 && (
            <div className="all-notifs-count notifs-count">
              {notifications.total}
            </div>
          )}
        </div>

        <div className="nofifications-options">
          <div
            onClick={() => {
              setInitial(2);
              setIsNotifOpen(true);
            }}
            className="hvr-grow post-tab-notifications follow-notifs"
          >
            <AiOutlineUserAdd />
            {notifications.num_follows > 0 && (
              <div className="follow-notifs-count notifs-count">
                {notifications.num_follows}
              </div>
            )}
          </div>
          <div
            onClick={() => {
              history.push("/stream/play");
            }}
            className="hvr-grow post-tab-notifications tag-notifs"
          >
            <BsCameraVideo />
          </div>
          <div
            onClick={() => {
              setInitial(4);
              setIsNotifOpen(true);
            }}
            className="hvr-grow post-tab-notifications comment-notifs"
          >
            <BsChat />
            {notifications.num_comment_tags > 0 && (
              <div className="comment-notifs-count notifs-count">
                {notifications.num_comment_tags}
              </div>
            )}
          </div>
          <div
            onClick={() => {
              setInitial(5);
              setIsNotifOpen(true);
            }}
            className="hvr-grow post-tab-notifications tag-notifs"
          >
            <BsCameraVideo />
            {notifications.num_post_tags > 0 && (
              <div className="tag-notifs-count notifs-count">
                {notifications.num_post_tags}
              </div>
            )}
          </div>
        </div>
      </div>
      <NewPostModal
        isNotif={true}
        open={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      >
        <NotificationCenter
          onClose={() => setIsNotifOpen(false)}
          initialTab={initial}
        />
      </NewPostModal>

      <NewPostModal
        open={isPostOpen}
        onClose={() => {
  
          setIsPostOpen(false);
        }}
      >
        <NewPostModalNav />
        <NewPost
          onPost={() => {
      
            setIsPostOpen(false);
          }}
        />
      </NewPostModal>
    </div>
  );
};

export default NewPostTab;
