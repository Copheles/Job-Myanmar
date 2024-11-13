import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeModal } from "./modalSlice";
import JobDeleteModal from "@features/Main/SingleJob/components/JobDeleteModal";

export default function ModalManager() {
  const { open, type, header, bodyText, id } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const modals = {
    JobDeleteModal
  };

  let renderedModal;
  if (type && open) {
    const ModalComponent = (modals as any)[type];
    if(id){
      renderedModal = <JobDeleteModal id={id} />
    }else{
      renderedModal = <ModalComponent />;

    }
  }

  return (
    <Modal
      isCentered
      onClose={() => dispatch(closeModal())}
      isOpen={open}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{bodyText}</ModalBody>
        <ModalCloseButton />
        {renderedModal}
      </ModalContent>
    </Modal>
  );
}
