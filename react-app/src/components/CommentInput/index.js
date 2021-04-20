import "./CommentInput.css";
import React, { useState, useRef, useEffect } from "react";
import Editor from "draft-js-plugins-editor";
import { EditorState, convertToRaw } from "draft-js";
import createMentionPlugin, {
} from "draft-js-mention-plugin";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserMentionsComments,
} from "../../store/mentions";
import {
  uploadComment,
  fetchSinglePost,
} from "../../store/posts";

import { uploadMessage } from "../../store/messages";

const UserTag = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntry}>
          <div className={theme.mentionSuggestionsEntryContainerLeft}>
            <img
              src={mention.profilePicUrl}
              className={theme.mentionSuggestionsEntryProfilePic}
              alt="pic"
            />
          </div>

          <div className={theme.mentionSuggestionsEntryContainerRight}>
            <div className={theme.mentionSuggestionsEntryDisplayName}>
              {mention.displayName}
            </div>

            <div className={theme.mentionSuggestionsEntryUsername}>
              {mention.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentInput = ({
  post,
  modal,
  increaseNumComments,
  className = "comment-editor-wrapper",
  insideCN = "",
  action = "Post",
  placeHolder = "Add a comment...",
  receiverId,
}) => {
  const user = useSelector((state) => state.session.user);
  const userMentions = useSelector((state) => state.mentions.usersComments);
  
  const ref = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(null);

  const focus = () => {
    ref.current.focus();
    setFocused(true);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    setButtonDisabled(!editorState.getCurrentContent().hasText());
  }, [editorState]);

  const [userMentionPlugin] = useState(
    createMentionPlugin({
      userMentions,
      mentionComponent: (mentionProps) => (
        <span className={mentionProps.className}>{mentionProps.children}</span>
      ),
      entityMutability: "IMMUTABLE",
      theme: {
        mention: "mention",
        mentionSuggestions: "mentionSuggestions",
        mentionSuggestionsEntry: "mentionSuggestionsEntry",
        mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
        mentionSuggestionsEntryDisplayName:
          "mentionSuggestionsEntryDisplayName",
        mentionSuggestionsEntryUsername: "mentionSuggestionsEntryUsername",
        mentionSuggestionsEntryProfilePic: "mentionSuggestionsEntryProfilePic",
      },
      mentionPrefix: "@",
      supportWhitespace: true,
    })
  );


  const [query, setQuery] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
 
  useEffect(() => {
    if (query) dispatch(fetchUserMentionsComments(query));
  }, [dispatch, query]);

  useEffect(() => {
    focused && setSuggestions(userMentions);
  }, [userMentions]);





  const { MentionSuggestions } = userMentionPlugin;
  
  const plugins = [userMentionPlugin];

  const submitComment = async () => {
    const contentState = editorState.getCurrentContent();
    let rawData = convertToRaw(contentState);
    setEditorState(EditorState.createEmpty());
    let mentionedUsers = [];
    for (let key in rawData.entityMap) {
      const ent = rawData.entityMap[key];
      switch (ent.type) {
        case "mention":
          mentionedUsers.push(ent.data.mention);
          break;
        default:
          break;
      }
    }
    if (action === "Post") {
      increaseNumComments && increaseNumComments();
      await dispatch(
        uploadComment(user.id, mentionedUsers, rawData, post.id, modal)
      );
      modal && dispatch(fetchSinglePost(post.id));
    } else {
      // await sendAMessage(user.id, receiverId, rawData.message, dispatch);
      await uploadMessage(
        user.id,
        receiverId,
        mentionedUsers,
        rawData,
        dispatch
      );
    }
  };

  return (
    <div className={className}>
      <div
        className={
          insideCN
            ? insideCN
            : modal
            ? "comment-editor comment-pic-modal"
            : "comment-editor"
        }
        onBlur={() => setFocused(false)}
        onFocus={focus}
      >
        <Editor
          editorState={editorState}
          plugins={plugins}
          placeholder={placeHolder}
          onChange={(editorState) => {
            return setEditorState(editorState);
          }}
          ref={(event) => (ref.current = event)}
        />
        <MentionSuggestions
          onSearchChange={({ value }) => {
            setQuery(value);
          }}
          suggestions={suggestions}
          entryComponent={UserTag}
        />
      
      </div>
      <button
        disabled={buttonDisabled}
        // onClick={submitAction ? submitAction : submitComment}
        onClick={submitComment}
        className="comment-submit"
      >
        {action}
      </button>
    </div>
  );
};

export default CommentInput;
