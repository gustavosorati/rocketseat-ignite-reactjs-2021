import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalHeader,
  background,
  color,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="900px" maxH={600} margin="2rem">
        <Image src={imgUrl} objectFit="cover" width="100%" />

        <ModalBody
          display="flex"
          backgroundColor="pGray.800"
          borderRadius="0 0 6px 6px"
        >
          <ModalFooter padding={0}>
            <Link href={imgUrl}>Abrir original</Link>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
