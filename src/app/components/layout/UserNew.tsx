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
import {useErrorToast, useSuccessToast} from "@src/app/hooks/useCustomToast";
import {toStringErrorCode} from "@src/app/libs/toStringErrorCode";

type Data = {
  email: string,
  name: string,
};

export default function UserNew() {
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

    fetch('/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: data.name, email: data.email})
    }).then(res => {
      if(res.ok) {
        return sendPasswordResetEmail(auth, data.email).then(() => {
          successToast('ユーザー作成成功', 'メールアドレス宛に送信したURLから、パスワードの再設定を行ってください。');
          router.push('/users');
        });
      } else {
        res.json().then(e => errorToast('ユーザー作成失敗', toStringErrorCode(e)));
      }
    }).catch(e => {
      console.log(e);
      errorToast('ユーザー作成失敗', toStringErrorCode(e));
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
