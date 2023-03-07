import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import Comment from "./Comment";
import React, { useEffect, useState } from "react";
import FormTextArea from "./FormTextArea";
import { useDispatch } from "react-redux";
import {
  clearAlert,
  showAlert,
} from "../redux/features/feedback/feedbackSlice";
import { useSelector } from "react-redux";
import AlertPopUp from "./AlertPopUp";
import { createComment, updateComment } from "../redux/features/job/jobThunks";
import { io } from "socket.io-client";
import {
  postCommentSocket,
  updateCommentSocket,
} from "../redux/features/job/jobSlice";

const CommentContainer = ({ comments, job, jobOwnerId }) => {
  const [content, setContent] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [currentActiveReply, setCurrenActiveReply] = useState(null);
  const [socket, setSocket] = useState(null);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);

  const { postCommentData, updateCommentData } = useSelector(
    (state) => state.job
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAlert());
    if (!content) {
      dispatch(
        showAlert({
          status: "error",
          description: "Please add comment",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      console.log("Click post");
      if (!isUpdateComment) {
        const commentData = { content, job };
        dispatch(createComment(commentData));
        setContent("");
      } else {
        const commentData = { content };
        const id = editCommentId;
        dispatch(updateComment({ id, commentData }));
        setContent("");
        setEditCommentId(null);
        setIsUpdateComment(false);
      }
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const newSocket = io("https://jobmyanmarsocketserver.onrender.com");
    // const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("connect", () => {
      console.log("Client SocketID ", socket.id);
    });
    if (postCommentData) {
      const data = [postCommentData, job]
      console.log('reply ',data)
      socket.emit("postComment", data );
    }
    socket.on("postCommentServer", (data) => {
      dispatch(postCommentSocket(data));
    });

    if (updateCommentData) {
      socket.emit("updateComment", updateCommentData);
    }

    socket.on("updateCommentServer", (data) => {
      dispatch(updateCommentSocket(data));
    });
  }, [postCommentData, socket, dispatch, updateCommentData, job]);

  return (
    <Box mt={10}>
      <Heading fontSize={{ base: "25px", md: "30px" }} fontWeight="thin">
        Comments
      </Heading>

      <Box mt={10}>
        {comments.map((comment) => {
          return (
            <Box key={comment._id}>
              <Comment
                key={comment._id}
                comment={comment}
                setContent={setContent}
                setIsUpdateComment={setIsUpdateComment}
                setEditCommentId={setEditCommentId}
                jobOwnerId={jobOwnerId}
                currentActiveReply={currentActiveReply}
                setCurrenActiveReply={setCurrenActiveReply}
                job={job}
                ml={0}
                socket={socket}
              />
              <Divider />
            </Box>
          );
        })}
      </Box>
      <Box mt={10} as="form" onSubmit={handleSubmit}>
        {isShowAlert && <AlertPopUp {...alertDetails} />}
        <FormTextArea
          placeholder="Your comment"
          value={content}
          handleChange={handleChange}
        />
        <Button mt={5} colorScheme="red" type="submit">
          {isUpdateComment ? "Update" : "Post"}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentContainer;
