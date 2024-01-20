'use client';

import {
  Card,
  CardBody,
  Text,
  VStack,
  InputGroup,
  Input,
  InputLeftAddon,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {sendPasswordResetEmail, getAuth} from "@src/app/libs/firebaseConfig";
import {useForm} from 'react-hook-form'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useState} from "react";
import BackButton from "@src/app/components/ui/BackButton";
import {useRouter} from "next/navigation";
import {useErrorToast, useSuccessToast} from "@src/app/libs/useCustomToast";
import {toStringErrorCode} from "@src/app/libs/toStringErrorCode";

type Data = {
  email: string,
};

export default function PasswordReset() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const auth = getAuth();

  const isValid = async (data: Data) => {
    setData(data);
    onOpen();
  };
  const submitHandler = async () => {
    onClose();
    if (!data) {
      return false;
    }
    setIsDisabled(true);

    sendPasswordResetEmail(auth, data.email).then(() => {
      successToast('メールを送信しました');
      router.push('/');
    }).catch(e => {
      console.log(e);
      errorToast('エラーが発生しました', toStringErrorCode(e));
    }).finally(() => {
      setIsDisabled(false);
    });
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();

  return (
    <Card>
      <CardBody>
        <form className='mt-2 flex w-8/12 flex-col lg:w-1/2' onSubmit={handleSubmit(isValid)}>
          <VStack spacing={4}>
            <VStack spacing={1} w="100%" align="left">
              <Text pb={2}>ログインメールアドレス宛にパスワード設定用のURLを送信します。<br/>リンク先で新しいパスワードを設定してログインしてください。</Text>
              <Text pb={2}>※noreply@jarinko-member-auth.firebaseapp.comからのメールを受信できるようにメール設定をご確認ください。</Text>
              <Text pb={8}>※この画面からメールアドレスの正否確認は行えません。ログインメールアドレスがわからない場合は、管理者にお問合せください。</Text>
              <InputGroup>
                <InputLeftAddon>
                  <ReactIcon iconName="LuMail"/>
                </InputLeftAddon>
                <Input
                  type='email'
                  placeholder='メールアドレス'
                  {...register('email', {required: 'メールアドレスを入力してください'})}
                />
              </InputGroup>
              <Text color="red">{errors.email?.message}</Text>
            </VStack>
            <ButtonGroup w="100%" mt={10} spacing={4} justifyContent="right">
              <BackButton href="/users" to="top"/>
              <Button
                type="submit"
                colorScheme="green"
                rightIcon={<ReactIcon iconName='LuSend'/>}
                isDisabled={isDisabled}
              >メール送信</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                  <ModalHeader>パスワード再設定メール送信</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <Text>メールを送信しますか？</Text>
                  </ModalBody>

                  <ModalFooter>
                    <ButtonGroup w="100%" mt={10} spacing={4} justifyContent="right">
                      <Button
                        variant='outline'
                        colorScheme="gray"
                        onClick={onClose}
                      >閉じる</Button>
                      <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={submitHandler}
                        isDisabled={isDisabled}
                      >
                        実行
                      </Button>
                    </ButtonGroup>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </ButtonGroup>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
