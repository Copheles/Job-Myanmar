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
import FormTextArea from "@components/FormTextArea";
import useCustomToast from "@hooks/useCustomToast";
import moment from "moment";
import { useForm } from "react-hook-form";
import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteCommentMutation,
  usePostCommentMutation,
  useUpdateCommentMutation,
} from "../slice/commentApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";

interface Comment {
  author: string;
  commentBy: string;
  parentId?: string;
  content: string;
  job?: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  _id: string;
  replies: Comment[] | [];
}

interface IComment {
  ml: number;
  comment: Comment;
  owner: string;
}

interface FormValues {
  reply: string;
}

interface EditCommentFormValues {
  editComment: string;
}

export default function Comment({ comment, ml, owner }: IComment) {
  const { id } = useParams();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { createdAt, author, content, replies } = comment;
  const timestamp = moment(createdAt).fromNow();

  const [isEditing, setIsEditing] = useState(false);

  const [postComment] = usePostCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const isCommentOwner = userInfo?.id === comment.commentBy;
  const isJobOwner = userInfo?.id === owner;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    reset: updateRest,
    formState: { errors: updateErrors },
  } = useForm<EditCommentFormValues>({
    defaultValues: {
      editComment: content,
    },
  });

  const { customToast } = useCustomToast();

  const handleDelete = async () => {
    try {
      await deleteComment({ id: comment._id, jobId: id }).unwrap();
      customToast({
        title: "Reply a comment",
        description: "Successfully replied",
        status: "success",
      });
    } catch (error: any) {
      customToast({
        title: "Delete comment",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
  };

  const onUpdateSubmit = async (data: EditCommentFormValues) => {
    try {
      await updateComment({
        content: data.editComment,
        id: comment._id,
        jobId: id,
      }).unwrap();
      customToast({
        title: "Update comment",
        description: "Updated comment",
        status: "success",
      });
    } catch (error: any) {
      customToast({
        title: "Update comment",
        description: error?.data?.message || error.error,
        status: "error",
      });
    } finally {
      updateRest();
      setIsEditing(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await postComment({
        content: data.reply,
        job: id,
        parentId: comment._id,
      }).unwrap();

      customToast({
        title: "Reply a comment",
        description: "Successfully replied",
        status: "success",
      });
    } catch (error: any) {
      customToast({
        title: "Post a reply",
        description: error?.data?.message || error.error,
        status: "error",
      });
    } finally {
      reset();
      setIsReplyOpen(false);
    }
  };

  return (
    <Box
      my={4}
      gap={5}
      ml={{ base: `${ml + 1}`, md: `${ml + 2}` }}
      fontSize={{ base: "14px", sm: "16px", md: "17px", lg: "17px" }}
    >
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
            aria-label="comment option icon"
            icon={<BsReplyFill />}
            variant="ghost"
            _focus={{ color: mode("red.500", "red.200") }}
            _visited={{ bg: mode("red.500", "red.200") }}
            onClick={() => setIsReplyOpen(!isReplyOpen)}
          />
        </Flex>
        {(isCommentOwner || isJobOwner) && (
          <Popover placement="top-start">
            <PopoverTrigger>
              <IconButton
                aria-label="threedot"
                variant="ghost"
                icon={<BsThreeDotsVertical />}
              />
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
                {isCommentOwner && (
                  <Button
                    variant="ghost"
                    fontWeight="thin"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>

      {isEditing ? (
        <Flex
          direction="column"
          as="form"
          onSubmit={updateHandleSubmit(onUpdateSubmit)}
          mt={2}
        >
          <FormTextArea
            name="editComment"
            validationRules={{
              required: "Comment is required",
            }}
            register={updateRegister}
            error={updateErrors.editComment}
          />
          <Flex gap={3} mt={3} alignSelf="end">
            <Button
              colorScheme="gray"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="red" size="sm" type="submit">
              Save
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Text ml="50px">{content}</Text>
      )}

      {isReplyOpen && (
        <Box mt={5} as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormTextArea
            placeholder="Your reply"
            name="reply"
            validationRules={{
              required: "About company is required",
            }}
            register={register}
            error={errors.reply}
          />
          <Button mt={5} colorScheme="red" type="submit">
            Reply
          </Button>
        </Box>
      )}
      {replies &&
        replies.map((reply) => (
          <Comment key={reply._id} owner={owner} ml={ml + 2} comment={reply} />
        ))}
    </Box>
  );
}
