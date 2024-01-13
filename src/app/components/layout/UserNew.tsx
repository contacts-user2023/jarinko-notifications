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
  useToast,
} from '@chakra-ui/react'
import {createUserWithEmailAndPassword, sendPasswordResetEmail, getAuth, db} from "@src/app/libs/firebaseConfig";
import {doc, setDoc} from "firebase/firestore";
import {FirebaseError} from 'firebase/app'
import {useForm} from 'react-hook-form'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useState} from "react";
import BackButton from "@src/app/components/ui/BackButton";
import {useRouter} from "next/navigation";
import {generateRandomString} from "@src/app/libs/generateRandomString";

type Data = {
  email: string,
  name: string,
};

export default function UserNew() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState<Data | null>(null);

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

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, generateRandomString(16));
      const storeData = {uid: userCredential.user.uid, name: data.name};
      await setDoc(doc(db, "users", userCredential.user.uid), storeData);
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: 'ユーザー作成成功',
        description: 'メールアドレス宛に送信したURLから、パスワードの再設定を行ってください。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      router.push('/users');
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        const message = e.code === 'auth/email-already-in-use'
          ? 'メールアドレスがすでに使用されています。'
          : e.code === 'auth/invalid-email'
            ? 'メールアドレスの形式が正しくありません。'
            : `エラーコード: ${e.code}`;
        toast({
          title: 'ユーザー作成失敗',
          description: message,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setIsDisabled(false);
    }
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
              <InputGroup>
                <InputLeftAddon>
                  <ReactIcon iconName="LuUser2"/>
                </InputLeftAddon>
                <Input
                  type='text'
                  placeholder='ユーザー名'
                  {...register('name', {
                    required: 'ユーザー名を入力してください',
                    maxLength: {
                      value: 20, message: '20文字以下で入力してください'
                    },
                  })}
                />
              </InputGroup>
              <Text color="red">{errors.name?.message}</Text>
            </VStack>
            <VStack spacing={1} w="100%" align="left">
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
              <BackButton href="/users"/>
              <Button
                type="submit"
                colorScheme="green"
                rightIcon={<ReactIcon iconName='LuFilePlus'/>}
                isDisabled={isDisabled}
              >ユーザー作成</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                  <ModalHeader>ユーザーを登録しますか？</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <Text>ユーザーを登録すると、メールアドレス宛にパスワード設定用のURLが送信されます。</Text>
                    <Text>リンク先でパスワードを設定してログインしてください。</Text>
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
