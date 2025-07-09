import { Button, ModalFooter } from "@chakra-ui/react";
import { closeModal } from "@components/modal/modalSlice";
import { useDeleteJobMutation } from "@features/Main/AllJobs/slice/jobApiSlice";
import useCustomToast from "@hooks/useCustomToast";
import useLanguage from "@hooks/useLanguage";
import { useAppDispatch } from "@redux/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

export default function JobDeleteModal({ id }: Props) {
  const { language } = useLanguage();
  const [deleteJob] = useDeleteJobMutation();

  const { customToast } = useCustomToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    try {
      await deleteJob(id).unwrap();
      customToast({
        title: "Delete Job",
        description: "Successfully deleted",
        status: "success",
      });
      dispatch(closeModal());
      navigate("/");
    } catch (error: any) {
      customToast({
        title: "Delete Job",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
  };

  return (
    <ModalFooter>
      <Button colorScheme="gray" mr={3} onClick={handleClose}>
        {language.deleteModal.closeBtnText}
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>
        {language.deleteModal.deleteBtnText}
      </Button>
    </ModalFooter>
  );
}
