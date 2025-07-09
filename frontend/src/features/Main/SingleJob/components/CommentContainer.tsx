import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import Comment from "./Comment";
import FormTextArea from "@components/FormTextArea";
import { useForm } from "react-hook-form";
import useCustomToast from "@hooks/useCustomToast";
import { usePostCommentMutation } from "../slice/commentApiSlice";
import useLanguage from "@hooks/useLanguage";

interface Comment {
  author: string;
  commentBy: string;
  content: string;
  job: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  _id: string;
  replies: Comment[];
}

interface CommenContainerProps {
  comments: Comment[];
  jobId: string | undefined;
  owner: string;
}

interface FormValues {
  comment: string;
}

export default function CommenContainer({
  comments,
  owner,
  jobId,
}: CommenContainerProps) {
  const { language } = useLanguage();
  const [postComment] = usePostCommentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { customToast } = useCustomToast();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      await postComment({ content: data.comment, job: jobId }).unwrap();
      customToast({
        title: "Post a comment",
        description: "Successfully posted",
        status: "success",
      });
    } catch (error: any) {
      customToast({
        title: "Post a comment",
        description: error?.data?.message || error.error,
        status: "error",
      });
    } finally {
      reset();
    }
  };

  return (
    <Box mt={5} mb={10}>
      <Heading fontSize={{ base: 15, md: 20 }} fontWeight="medium">
        {language.singleJobText.commentLabel}
      </Heading>
      <Box mt={10}>
        {comments.map((comment: Comment) => (
          <Box key={comment._id}>
            <Comment ml={0} owner={owner} comment={comment} key={comment._id} />
            <Divider />
          </Box>
        ))}
      </Box>
      <Box mt={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormTextArea
          placeholder={language.singleJobText.commentPlaceHolder}
          name="comment"
          validationRules={{
            required: "About company is required",
          }}
          register={register}
          error={errors.comment}
        />
        <Button mt={5} colorScheme="red" type="submit" fontSize={{ base: 12, md: 16}}>
          { language.singleJobText.postLabel }
        </Button>
      </Box>
    </Box>
  );
}
