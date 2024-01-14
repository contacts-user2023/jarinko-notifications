'use client';

import {
  Text,
  Avatar,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, useToast,
} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useState} from "react";
import {useRouter} from "next/navigation";

type Props = {
  actionType: string,
  name: string,
  uid: string,
  iconName: string,
  title: string,
  body: string,
};

export default function UserActionButtonAvatar(
  {
    actionType,
    name,
    uid,
    iconName,
    body,
    title
  }: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const Body = body.split('\n').map((line: string, i) => (<Text key={i}>{line}</Text>));

  const handleAction = async () => {
    setIsDisabled(true);
    onClose();
    switch (actionType) {
      case 'delete':
        const response = await fetch("/api/users/", {
          method: 'DELETE',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({uid: uid}),
        });
        toast({
          title: `ユーザー削除${response?.ok ? '成功' : '失敗'}`,
          status: response?.ok ? 'success' : 'error',
          position:'top',
          duration: 5000,
          isClosable: true,
        });
        router.refresh();
        break;
      case 'reset':
        console.log('reset');
        break;
      default:
        console.log('actionType is nothing');
    }
    setIsDisabled(false);
  };

  return (
    <>
      <Avatar
        variant="outline"
        as="button"
        onClick={onOpen}
        bg="inherit"
        color="red.500"
        size="sm"
        icon={<ReactIcon iconName={iconName} boxSize={6}/>}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Text pb={4}>ユーザー名: {name}</Text>
            {Body}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w="100%" mt={10} spacing={4} justifyContent="right">
              <Button
                variant='outline'
                colorScheme="gray"
                onClick={onClose}
              >閉じる
              </Button>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={handleAction}
                isDisabled={isDisabled}
              >
                実行
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
