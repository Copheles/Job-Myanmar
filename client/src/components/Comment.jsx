import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment } from "../redux/features/job/jobThunks";
import { BsReplyFill } from "react-icons/bs";

import FormTextArea from "./FormTextArea";
import {
  clearAlert,
  showReplyAlert,
} from "../redux/features/feedback/feedbackSlice";
import AlertPopUp from "./AlertPopUp";

const Comment = ({
  comment,
  setContent,
  setIsUpdateComment,
  setEditCommentId,
  jobOwnerId,
  currentActiveReply,
  setCurrenActiveReply,
  job,
  ml,
}) => {
  const { _id, author, content, createdAt, commentBy, replies } = comment;
  const { _id: userId } = useSelector((state) => state.user.user);
  const [replyContent, setReplyContent] = useState("");
  const { isReplyAlert, replyAlertDetails } = useSelector(
    (state) => state.feedback
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsUpdateComment(false);
    setContent("");
    dispatch(deleteComment(_id));
  };

  const handleEdit = () => {
    setContent(content);
    setIsUpdateComment(true);
    setEditCommentId(_id);
  };
  console.log(currentActiveReply)
  const handleReply = () => {
    setIsUpdateComment(false);
    setContent("");
    if (currentActiveReply) {
      setCurrenActiveReply(null);
    } 
    if (currentActiveReply?.id && currentActiveReply?.id === _id){
      setCurrenActiveReply(null)
    }
    if( currentActiveReply?.id &&  currentActiveReply.id !== _id){
      setCurrenActiveReply({ id: _id, isShowReplyArea: true });
    }
    if(currentActiveReply === null) {
      setCurrenActiveReply({ id: _id, isShowReplyArea: true });
    } 
  };

  const handleReplyCommit = (e) => {
    e.preventDefault();

    if (!replyContent) {
      dispatch(
        showReplyAlert({
          status: "error",
          description: "Please add reply",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      console.log('click reply')
      const commentData = { content: replyContent, parentId: _id };
      dispatch(createComment(commentData));
      setContent("");
      setReplyContent("")
      setEditCommentId(null);
      setIsUpdateComment(false);
      setCurrenActiveReply(null);
    }
  };

  const timestamp = moment(createdAt).fromNow();

  const handleChange = (e) => {
    setReplyContent(e.target.value);
  };

  return (
    <Box my={4} gap={5} ml={ml + 3}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Avatar size="sm" mr={5} />
          <Text fontWeight="bold">
            {author}
            <Text
              as="span"
              mx={3}
              color={mode("gray.500", "gray.500")}
              fontWeight="thin"
              display="inline"
            >
              {timestamp}
            </Text>
          </Text>
          <IconButton
            icon={<BsReplyFill />}
            variant="ghost"
            _focus={{ color: mode("red.500", "red.200") }}
            _visited={{ bg: mode("red.500", "red.200") }}
            onClick={handleReply}
          />
        </Flex>
        {(userId === commentBy || userId === jobOwnerId) && (
          <Popover placement="top-start">
            <PopoverTrigger>
              <IconButton variant="ghost" icon={<BsThreeDotsVertical />} />
            </PopoverTrigger>
            <PopoverContent bg={mode("gray.300", "gray.600")} maxW="100px">
              <PopoverBody display="flex" flexDirection="column">
                <Button
                  variant="ghost"
                  fontWeight="thin"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                {commentBy === userId && (
                  <Button
                    variant="ghost"
                    fontWeight="thin"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
      <Text ml="50px">{content}</Text>

      {currentActiveReply?.isShowReplyArea && currentActiveReply.id === _id && (
        <Box mt={2}>
          {isReplyAlert && <AlertPopUp {...replyAlertDetails} />}
          <FormTextArea value={replyContent} handleChange={handleChange} />
          <Button
            mb={3}
            mt={3}
            size="sm"
            colorScheme="red"
            onClick={handleReplyCommit}
          >
            Reply
          </Button>
        </Box>
      )}
      {replies &&
        replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            setContent={setContent}
            setIsUpdateComment={setIsUpdateComment}
            setEditCommentId={setEditCommentId}
            jobOwnerId={jobOwnerId}
            currentActiveReply={currentActiveReply}
            setCurrenActiveReply={setCurrenActiveReply}
            job={job}
            ml={ml + 3}
          />
        ))}
    </Box>
  );
};

export default Comment;
