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

const CommentContainer = ({ comments, job, jobOwnerId }) => {
  const [content, setContent] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [currentActiveReply, setCurrenActiveReply] = useState(null);

  const dispatch = useDispatch();
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);
  const { comments: commentsData } = useSelector(
    (state) => state.job.singleJob
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
        console.log("Updating comment");
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

  useEffect(() => {}, [commentsData]);

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
